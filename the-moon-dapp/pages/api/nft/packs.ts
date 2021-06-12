import { getAllPacksForSale } from '@aobeta/flow-lib/scripts';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultHandler } from '../../../lib/middlewares/handlers';
import loadConfig from '../../../utils/loadConfig';

const moonPlatformAddress = process.env.MOON_PLATFORM_ACCOUNT_ADDRESS as string;
const flowNode = process.env.FLOW_ACCESS_NODE as string;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		loadConfig();
		const nftGroups = await getAllPacksForSale(moonPlatformAddress, flowNode);

		res.status(200).json(nftGroups);
	} catch (error) {
		res.status(500).json({
			error: error.message,
			moonPlatformAddress,
			flowNode,
		});
	}
};

export default DefaultHandler().get(handler);
