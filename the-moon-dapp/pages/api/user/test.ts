import { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { PrismaClient } from '@aobeta/db-model/prisma';
import { OK } from 'http-codes';

const userRepository = new UserRepository(new PrismaClient());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = await userRepository.creatUser('testAuthId', {
		picture: 'testpic',
		nickname: 'testNickName',
		email: 'testEmail',
		email_verified: true,
	});

	res.status(OK).json(user);
}
