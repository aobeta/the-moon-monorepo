import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

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
		signIn: async (user, account, profile) => {
			console.log(user, account, profile);
			return true;
		},
	},
});
