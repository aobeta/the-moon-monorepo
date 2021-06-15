import { OK } from 'http-codes';
import { NextApiResponse } from 'next';
import { AuthenticatedRequest } from '../../../lib/middlewares/authenticated';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import prisma from '../../../lib/prisma';
import { AuthenticatedRequestHandler } from '../../../lib/middlewares/handlers';

const userRepository = new UserRepository(prisma);

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
	const session = req.session;
	const user = await userRepository.getUserProfileByAuthId(session.user.id);
	res.status(OK).json(user);
}

export default AuthenticatedRequestHandler().get(handler);
