import NextAuth, { Profile } from 'next-auth';
import Providers from 'next-auth/providers';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import prisma from '../../../lib/prisma';

const userRepository = new UserRepository(prisma);

const clientId = process.env.AUTH0_CLIENT_ID as string;
const clientSecret = process.env.AUTH0_CLIENT_SECRET as string;
const domain = process.env.AUTH0_DOMAIN as string;

interface MoonProfile extends Profile {
	email: string;
	nickname: string;
	picture: string;
	email_verified: boolean;
}

export default NextAuth({
	providers: [
		Providers.Auth0({
			clientId: clientId,
			clientSecret: clientSecret,
			domain: domain,
			idToken: true,
		}),
	],
	callbacks: {
		session: async (session, user) => {
			if (session) {
				Object.assign(session.user, { id: user.sub });
			}
			return session;
		},
		async signIn(user, account, profile: MoonProfile) {
			// console.log('SIGN IN :: ', user, account, profile);
			await userRepository.findOrCreateUser(user.id as string, profile);
			return true;
		},
	},
	jwt: {
		secret: 'JwtSecretTest',
	},
	events: {
		// async signIn(message) {
		// 	// console.log('SIGN IN EVENT :: ', message);
		// },
		async error(message) {
			console.log('Error event EVENT :: ', message);
		},
	},
});
