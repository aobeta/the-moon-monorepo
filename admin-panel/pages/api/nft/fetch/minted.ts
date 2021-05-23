import { NextApiRequest, NextApiResponse } from "next";
import {getAdminMintedNFTGroupInfo} from "@aobeta/flow-lib/scripts";

export default async (req : NextApiRequest, res: NextApiResponse) => {
    const address = process.env.MOON_PLATFORM_ACCOUNT_ADDRESS
    const flowAccessNode = process.env.FLOW_ACCESS_NODE

    const nftGroups = await getAdminMintedNFTGroupInfo(address, flowAccessNode);

    res.status(200).json(nftGroups);
}
