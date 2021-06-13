import { FlowWallet } from '.prisma/client';
import axios from 'axios';
import { UserProfile } from '../types/user';

export const getLoggedInUserProfile = async () => {
	const { data } = await axios.get('/api/user');

	return data as UserProfile;
};

export interface UserWalletInitializationAttempt {
	address: string | null;
	userId: number | undefined;
	isInitialized: boolean;
}

export const submitUserWalletInitialization = async (
	walletInfo: UserWalletInitializationAttempt,
) => {
	const { data } = await axios.post('/api/user/wallet', walletInfo);

	return data as FlowWallet;
};
