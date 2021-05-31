import { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { PrismaClient } from '@aobeta/db-model/prisma';
import { OK } from 'http-codes';

const userRepository = new UserRepository(new PrismaClient());

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
