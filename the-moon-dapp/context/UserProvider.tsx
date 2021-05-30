import axios from 'axios';
import { Provider as AuthProvider, useSession } from 'next-auth/client';
import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
interface UserState {
	resolving: boolean;
	user: UserProfile | null;
}

const DEFAULT_USER_STATE = {
	resolving: true,
	user: null,
};

const UserContext = createContext<UserState>(DEFAULT_USER_STATE);

const UserProviderInner: FunctionComponent = ({ children }) => {
	const [session, isLoadingSession] = useSession();

	const [user, setUser] = useState<UserProfile | null>(null);
	const [resolving, setResolving] = useState<boolean>(true);

	useEffect(() => {
		if (isLoadingSession) {
			setResolving(true);
			setUser(null);
		} else {
			if (session != null) {
				// fetch user
				axios.get('/api/user').then((response) => {
					setUser(response.data as UserProfile);
					setResolving(false);
				});
			} else {
				setResolving(false);
			}
		}
	}, [session, isLoadingSession]);

	return (
		<UserContext.Provider
			value={{
				user,
				resolving,
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
