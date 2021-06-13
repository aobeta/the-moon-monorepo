import axios, { AxiosResponse } from 'axios';

export const SignTransaction = async (message: string) => {
	const { data } = await axios.post<unknown, AxiosResponse<{ signedMessage: string }>>(
		'/api/crypto/sign',
		{
			message,
		},
	);

	const { signedMessage } = data;
	return signedMessage;
};
