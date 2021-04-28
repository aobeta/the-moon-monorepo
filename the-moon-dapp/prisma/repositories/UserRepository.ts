import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/db/prisma';
import { colors, names, adjectives, uniqueNamesGenerator } from 'unique-names-generator';

export interface Profile {
	nickname: string;
	email: string;
	picture: string;
	email_verified: boolean;
}

export class UserRepository {
	prisma: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prisma = prismaClient;
	}

	async findOrCreateUser(userAuthId: string, profile: Profile) {
		const user = await this.prisma.user.findFirst({
			where: {
				userAuthId,
			},
		});

		if (user == null) {
			await this.creatUser(userAuthId, profile);
		}
	}

	async creatUser(userAuthId: string, profile: Profile) {
		await this.prisma.user.create({
			data: {
				userAuthId,
				fullName: profile.nickname as string,
				username: generateRandomUsername(),
				isUsingDefaultUsername: true,
				profilePic: profile.picture as string,
				email: profile.email,
				emailVerified: profile.email_verified,
			},
		});
	}

	async getUser(userAuthId: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				userAuthId,
			},
		});

		return user;
	}
}

const generateRandomUsername = () => {
	const uniqueUsername = uniqueNamesGenerator({ dictionaries: [adjectives, colors, names] });

	return uniqueUsername.toLowerCase();
};

const userRepository = new UserRepository(prisma);

export default userRepository as UserRepository;
