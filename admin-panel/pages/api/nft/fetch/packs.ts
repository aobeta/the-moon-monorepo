import { getAllPacksForSale } from "@aobeta/flow-lib/scripts";
import { NextApiRequest, NextApiResponse } from "next";
import loadConfig from "../../../../utils/loadConfig";

export default async (req : NextApiRequest, res: NextApiResponse) => {
    loadConfig();
    const address = process.env.MOON_PLATFORM_ACCOUNT_ADDRESS
    const flowAccessNode = process.env.FLOW_ACCESS_NODE

    const nftGroups = await getAllPacksForSale(address, flowAccessNode);

    res.status(200).json(nftGroups);
}
