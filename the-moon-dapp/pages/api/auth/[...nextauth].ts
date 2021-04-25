import NextAuth, { Profile } from 'next-auth';
import Providers from 'next-auth/providers';
import userRepository from '../../../prisma/repositories/UserRepository';

interface MoonProfile extends Profile {
	email: string;
	nickname: string;
	picture: string;
	email_verified: boolean;
}

export default NextAuth({
	providers: [
		Providers.Auth0({
			clientId: 'X7FX9FBPCb6pPfnafGTx5fB4gFPKGlIL',
			clientSecret: 'uGD4qThPxzx3myuwTRDZRKAy0DuSNq6y-3UYlqB2rf10ZxbI0rvcw17tZixae2gB',
			domain: 'getmoons.us.auth0.com',
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
			console.log('SIGN IN :: ', user, account, profile);
			await userRepository.findOrCreateUser(user.id as string, profile);
			return true;
		},
	},
	jwt: {
		secret: 'JwtSecretTest',
	},
	events: {
		async signIn(message) {
			console.log('SIGN IN EVENT :: ', message);
		},
	},
});
