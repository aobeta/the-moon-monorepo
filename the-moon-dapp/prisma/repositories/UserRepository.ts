import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

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

const userRepository = new UserRepository(prisma);

export default userRepository as UserRepository;
