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

// for requests where authentication is mandatory
export interface AuthenticatedRequest extends NextApiRequest {
	session: UserSession;
}

// for requests where authentication is optional
export interface PotentiallyAuthenticatedRequest extends NextApiRequest {
	session?: UserSession;
}

/**
 * Decorates request object with session details.
 * NOTE: session may still be null even after attempt to resolve it.
 * @param request - request object
 * @param session - (optional) pass in session to decorate request object with. If not passed then an attempt to resolve the session will be made.
 */
export const DecorateRequestWithSession = async (
	request: NextApiRequest,
	session?: UserSession,
) => {
	let resolvedSession = session;
	if (resolvedSession == null) {
		resolvedSession = (await getSession({ req: request })) as UserSession;
	}
	// assign session on to request object
	const authenticatedRequest = Object.assign(request, { session: resolvedSession });

	return authenticatedRequest;
};

/**
 * Middleware that intercepts a request to make sure that it is authenticated. If the request is not authenticated then returns 401 UnAuthorized.
 * If the request is authenticated, then
 * @param handler function that will handle the request if it passes through check
 * @returns wrapped handler function that intercepts request.
 */
export const AuthenticateRequestMiddleware = async (
	request: NextApiRequest,
	response: NextApiResponse,
	next: () => void,
) => {
	const session: UserSession | null = (await getSession({ req: request })) as UserSession;

	if (session == null) {
		response.status(UNAUTHORIZED).json({ error: 'UnAuthorized' });
		return;
	}

	// assign session on to request object
	await DecorateRequestWithSession(request, session);

	next();
};
