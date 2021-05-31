import axios from 'axios';
import { Provider as AuthProvider, useSession } from 'next-auth/client';
import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
import { UserWallet } from '@aobeta/flow-lib/user';
import toast from 'react-hot-toast';
import { FlowWallet } from '@aobeta/db-model/prisma';
// import { FlowWallet } from '@aobeta/db-model/prisma';
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
			console.log('INITIALIZING WALLET');
			const wallet = new UserWallet(userProfile.wallet.address);
			await wallet.onInitialized();
			console.log('wallet logged In ?', wallet.isLoggedIn());
			// TODO potentially show toast if user wallet is not initialized
			setUserWallet(wallet);
		}

		setResolving(false);
	};

	const connectUserWallet = async () => {
		const wallet = new UserWallet();
		const userInfo = await wallet.signUp();
		if (userInfo.loggedIn == null) {
			toast.error('Failed To Connect Wallet. Please Try again');
			return null;
		}

		const { data } = await axios.post('/api/user/wallet', {
			address: userInfo.addr,
			userId: user?.id,
		});

		console.log('wallet data :', data);
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
