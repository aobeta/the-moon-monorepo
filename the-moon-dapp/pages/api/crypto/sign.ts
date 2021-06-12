import { NextApiRequest, NextApiResponse } from 'next';
import { signWithKey } from '@aobeta/flow-lib/transactions/server';
import { OK } from 'http-codes';
import { AuthenticatedRequestHandler } from '../../../lib/middlewares/handlers';

const PLATFORM_ACCOUNT_PRIVATE_KEY = process.env.PLATFORM_ACCOUNT_PRIVATE_KEY as string;

interface RequestBody {
	message: string;
}

const routeHandler = (req: NextApiRequest, res: NextApiResponse) => {
	const { message } = req.body as RequestBody;
	const signedMessage = signWithKey(message, PLATFORM_ACCOUNT_PRIVATE_KEY);
	res.status(OK).json({ signedMessage });
};

export default AuthenticatedRequestHandler().post(routeHandler);
