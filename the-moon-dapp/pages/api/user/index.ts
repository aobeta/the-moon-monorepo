import { OK, UNAUTHORIZED } from 'http-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import userRepository from '../../../prisma/repositories/UserRepository';

interface UserSession extends Session {
	user: {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session: UserSession | null = (await getSession({ req })) as UserSession;

	if (session != null) {
		const user = await userRepository.getUser(session.user.id);
		res.status(OK).json(user);
	} else {
		res.status(UNAUTHORIZED).json({ error: 'UnAuthorized' });
	}
}
