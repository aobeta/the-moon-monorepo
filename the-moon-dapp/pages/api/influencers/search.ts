import { ProfileRepository } from '@aobeta/db-model/repositories';
import { OK } from 'http-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../../../lib/middlewares/handlers';
import prisma from '../../../lib/prisma';

const profileRepository = new ProfileRepository(prisma);

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req.query;

	const profiles = await profileRepository.searchForInfluencers(query as string);

	res.status(OK).json(profiles);
}

export default DefaultHandler().get(handler);
