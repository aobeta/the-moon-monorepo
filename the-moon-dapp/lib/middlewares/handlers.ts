import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import cors from 'cors';
import { ACCEPTED } from 'http-codes';
import { AuthenticateRequestMiddleware, DecorateRequestWithSession } from './authenticated';

const SITE_ORIGIN = process.env.NEXTAUTH_URL;

export interface HandlerOptions {
	disableCors: boolean;
}

const onError = (err: string, req: NextApiRequest, res: NextApiResponse) => {
	res.status(500).json({ error: err.toString() });
};

export const DefaultHandler = (options?: HandlerOptions) => {
	options = options ?? { disableCors: false };
	const connectHandler = nc({ onError });

	if (!options.disableCors) {
		connectHandler.use(
			cors({
				origin: SITE_ORIGIN,
				optionsSuccessStatus: ACCEPTED,
			}),
		);
	}

	return connectHandler;
};

/**
 * Request handler that ensures that requests are authenticated. will throw 401 Unauthorized if request is not authorized.
 * @param options HandlerOptions object specifying whether to disable cors or not. cors is enabled by default.
 * @returns
 */
export const AuthenticatedRequestHandler = (options?: HandlerOptions) => {
	const connectHandler = nc({ onError });

	return connectHandler.use(DefaultHandler(options)).use(AuthenticateRequestMiddleware);
};

export const PotentiallyAuthenticatedHandler = (options?: HandlerOptions) => {
	const connectHandler = nc({ onError });

	return connectHandler
		.use(DefaultHandler(options))
		.use(async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
			await DecorateRequestWithSession(req);

			next();
		});
};
