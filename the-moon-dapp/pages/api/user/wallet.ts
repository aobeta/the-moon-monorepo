import { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { OK } from 'http-codes';
import prisma from '../../../lib/prisma';
import { AuthenticatedRequestHandler } from '../../../lib/middlewares/handlers';

const userRepository = new UserRepository(prisma);

interface Requestbody {
	address: string;
	userId: number;
}

// TODO protect API route
async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address, userId } = req.body as Requestbody;
	const wallet = await userRepository.registerNewWallet(userId, address);

	res.status(OK).json(wallet);
}

export default AuthenticatedRequestHandler().post(handler);
