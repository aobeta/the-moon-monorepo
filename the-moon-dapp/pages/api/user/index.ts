import { OK } from 'http-codes';
import { NextApiResponse } from 'next';
import { authenticated, AuthenticatedRequest } from '../../../lib/middlewares/authenticated';
import { httpGet } from '../../../lib/middlewares/methods';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { PrismaClient } from '@aobeta/db-model/prisma';

const userRepository = new UserRepository(new PrismaClient());

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
	const session = req.session;
	const user = await userRepository.getUserProfileByAuthId(session.user.id);
	res.status(OK).json(user);
}

export default httpGet(authenticated(handler));
