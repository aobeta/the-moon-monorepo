import { UNAUTHORIZED } from 'http-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';

export interface UserSession extends Session {
	user: {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export interface AuthenticatedRequest extends NextApiRequest {
	session: UserSession;
}

export interface PotentiallyAuthenticatedRequest extends NextApiRequest {
	session?: UserSession;
}

/**
 * Injects session into request object and then calls handler.
 * NOTE: session may still be null even after attempt to resolve it.
 * @param request
 * @param response
 * @param handler
 * @param session
 */
const injectSession = async (
	request: NextApiRequest,
	response: NextApiResponse,
	handler: AuthenticatedHandler,
	session?: UserSession,
) => {
	let resolvedSession = session;
	if (resolvedSession == null) {
		resolvedSession = (await getSession({ req: request })) as UserSession;
	}
	// assign session on to request object
	const authenticatedRequest = Object.assign(request, { session: resolvedSession });

	if (handler.constructor.name === 'AsyncFunction') {
		await handler(authenticatedRequest, response);
	} else {
		handler(authenticatedRequest, response);
	}
};

type AuthenticatedHandler =
	| ((request: AuthenticatedRequest, response: NextApiResponse) => Promise<void> | void)
	| ((request: PotentiallyAuthenticatedRequest, response: NextApiResponse) => Promise<void> | void);

/**
 * Intercepts a request to make sure that it is authenticated. If the request is not authenticated then returns 401 UnAuthorized.
 * If the request is authenticated, then
 * @param handler function that will handle the request if it passes through check
 * @returns wrapped handler function that intercepts request.
 */
export const authenticated = (
	handler: (request: AuthenticatedRequest, response: NextApiResponse) => Promise<void> | void,
) => {
	return async (request: NextApiRequest, response: NextApiResponse) => {
		const session: UserSession | null = (await getSession({ req: request })) as UserSession;

		if (session == null) {
			response.status(UNAUTHORIZED).json({ error: 'UnAuthorized' });
			return;
		}

		// assign session on to request object
		await injectSession(request, response, handler, session);
	};
};

/**
 * Method that assigns session to request object.
 * @param handler handler function for request
 * @returns wrapped handler function that intercepts request.
 */
export const withSession = (
	handler: (
		request: PotentiallyAuthenticatedRequest,
		response: NextApiResponse,
	) => Promise<void> | void,
) => {
	return async (request: NextApiRequest, response: NextApiResponse) => {
		// assign session on to request object
		await injectSession(request, response, handler);
	};
};
