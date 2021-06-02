import axios, { AxiosResponse } from 'axios';
import { Provider as AuthProvider, useSession } from 'next-auth/client';
import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
import { UserWallet } from '@aobeta/flow-lib/user';
import toast from 'react-hot-toast';
import { FlowWallet } from '@aobeta/db-model/prisma';

const FLOW_ACCOUNT_ADDRESS = process.env.NEXT_PUBLIC_MOON_PLATFORM_ACCOUNT_ADDRESS as string;
const FLOW_ACCOUNT_PUBLIC_KEY_ID = Number(process.env.NEXT_PUBLIC_MOON_ACCOUNT_PUBLIC_KEY_ID);

const signingFunction = async (message: string) => {
	console.log('message to sign... ', message);
	const { data } = await axios.post<unknown, AxiosResponse<{ signedMessage: string }>>(
		'/api/crypto/sign',
		{
			message,
		},
	);

	const { signedMessage } = data;
	console.log('message to sign... ', signedMessage);
	return signedMessage;
};

interface UserState {
	resolving: boolean;
	user: UserProfile | null;
	userWallet: UserWallet | null;
	connectUserWallet: () => Promise<FlowWallet | null>;
}

const stub = () => {
	throw Error('Using Default');
};

const DEFAULT_USER_STATE = {
	resolving: true,
	user: null,
	userWallet: null,
	connectUserWallet: stub,
};

const UserContext = createContext<UserState>(DEFAULT_USER_STATE);

const UserProviderInner: FunctionComponent = ({ children }) => {
	const [session, isLoadingSession] = useSession();

	const [user, setUser] = useState<UserProfile | null>(null);
	const [resolving, setResolving] = useState<boolean>(true);
	const [userWallet, setUserWallet] = useState<UserWallet | null>(null);

	useEffect(() => {
		if (isLoadingSession) {
			setResolving(true);
			setUser(null);
		} else {
			if (session != null) {
				// fetch user
				axios.get('/api/user').then((response) => setUpUser(response.data));
			} else {
				setResolving(false);
			}
		}
	}, [session, isLoadingSession]);

	const setUpUser = async (userProfile: UserProfile) => {
		setUser(userProfile);

		if (userProfile.wallet != null) {
			const wallet = new UserWallet(userProfile.wallet.address);
			await wallet.onInitialized();
			// TODO potentially show toast if user wallet is not initialized
			setUserWallet(wallet);
		}

		setResolving(false);
	};

	const connectUserWallet = async () => {
		const wallet = new UserWallet();
		const result = await wallet.signUp({
			platformAccount: FLOW_ACCOUNT_ADDRESS,
			accountPublicKeyId: FLOW_ACCOUNT_PUBLIC_KEY_ID,
			signingFunction,
		});
		console.log('SIGN UP result :: ', result);

		if (result.user.loggedIn == null) {
			toast.error('Failed To Connect Wallet. Please Try again');
			return null;
		}

		const { data } = await axios.post('/api/user/wallet', {
			address: result.user.addr,
			userId: user?.id,
			isInitialized: result.isInitialized,
		});

		return data as FlowWallet;
	};

	return (
		<UserContext.Provider
			value={{
				user,
				resolving,
				userWallet,
				connectUserWallet,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const UserProvider: FunctionComponent = ({ children }) => (
	<AuthProvider>
		<UserProviderInner>{children}</UserProviderInner>
	</AuthProvider>
);

export const useUser = () => {
	const userContext = useContext(UserContext);

	if (userContext == null) {
		throw new Error('Please maker sure to wrap useUser() with <UserProvider>');
	}

	return userContext;
};

export default UserProvider;
