import { ProfileWithUsername } from '@aobeta/db-model/repositories/ProfileRepository';
import axios from 'axios';

export const searchForInfluencer = async (query: string) => {
	const searchParams = new URLSearchParams({
		query,
	});

	const { data } = await axios.get(`/api/influencers/search?${searchParams}`);

	return data as ProfileWithUsername;
};
