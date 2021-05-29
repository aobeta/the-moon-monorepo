import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function federatedLogout(req: NextApiRequest, res: NextApiResponse) {
	const { callback, fromProvider } = req.query;

	const url = process.env.NEXTAUTH_URL as string;
	const auth0Domain = process.env.AUTH0_DOMAIN as string;
	const client_id = process.env.AUTH0_CLIENT_ID as string;

	const isReturningFromProvider = fromProvider === 'true';

	if (isReturningFromProvider) {
		// send back to our app.
		res.setHeader('Set-Cookie', [
			serialize('next-auth.session-token', '', {
				maxAge: -1,
				path: '/',
			}),
		]);
		return res.redirect(callback as string);
	} else {
		// send to auth0
		const returnParams = new URLSearchParams({
			callback: callback as string,
			fromProvider: String(true),
		});

		const returnTo = `${url}/api/signout?${returnParams}`;
		const auth0Params = new URLSearchParams({
			client_id,
			returnTo,
		});

		// redirect to auth0
		return res.redirect(`https://${auth0Domain}/v2/logout?${auth0Params}&federated`);
	}
}
