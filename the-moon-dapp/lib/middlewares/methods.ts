import { NOT_FOUND } from 'http-codes';
import { NextApiRequest, NextApiResponse } from 'next';

enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

/**
 * Returns a function that intercepts Http Request if the correct method wasn't used for the request doesnt match
 * the HTTP method that the handler expects.
 * @param method HttpMethod
 * @returns Returns a handler function
 */
const httpMethodHandler = (method: HttpMethod) => {
	return (
		handler: (request: NextApiRequest, response: NextApiResponse) => Promise<void> | void,
	) => {
		return async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
			const handlerMethod = request.method as HttpMethod;
			if (handlerMethod !== method) {
				response.status(NOT_FOUND).json({ error: `${handlerMethod} ${request.url} not found` });
				return;
			}

			// process if method matches
			if (handler.constructor.name === 'AsyncFunction') {
				await handler(request, response);
			} else {
				handler(request, response);
			}
		};
	};
};

/**
 * Http Interceptor to assure HTTP method on request is GET
 */
export const httpGet = httpMethodHandler(HttpMethod.GET);

/**
 * Http Interceptor to assure HTTP method on request is POST
 */
export const httpPost = httpMethodHandler(HttpMethod.POST);

/**
 * Http Interceptor to assure HTTP method on request is PUT
 */
export const httpPut = httpMethodHandler(HttpMethod.PUT);

/**
 * Http Interceptor to assure HTTP method on request is PATCH
 */
export const httpPatch = httpMethodHandler(HttpMethod.PATCH);

/**
 * Http Interceptor to assure HTTP method on request is DELETE
 */
export const httpDelete = httpMethodHandler(HttpMethod.DELETE);
