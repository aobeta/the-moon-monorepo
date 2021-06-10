import { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { OK } from 'http-codes';
import prisma from '../../../lib/prisma';

const userRepository = new UserRepository(prisma);

interface Requestbody {
	address: string;
	userId: number;
}

// TODO protect API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { address, userId } = req.body as Requestbody;
	const wallet = await userRepository.registerNewWallet(userId, address);

	res.status(OK).json(wallet);
}
