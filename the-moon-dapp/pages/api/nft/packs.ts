import { getAllPacksForSale } from '@aobeta/flow-lib/scripts';
import { NextApiRequest, NextApiResponse } from 'next';

const moonPlatformAddress = process.env.MOON_PLATFORM_ACCOUNT_ADDRESS as string;
const flowNode = process.env.FLOW_ACCESS_NODE as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
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
