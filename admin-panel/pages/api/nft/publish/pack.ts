import { publishNftPack } from "@aobeta/flow-lib/transactions/server";
import { PublishNftData } from "@aobeta/flow-lib/transactions/server/publishNftPack";
import { NextApiRequest, NextApiResponse } from "next";
import { GroupNftData } from "../../../../types/nft";
import { StatusCodes } from 'http-status-codes';
import loadConfig from "../../../../utils/loadConfig";


const {
    OK
} = StatusCodes;

export default async (req : NextApiRequest, res: NextApiResponse) => {
    loadConfig();
    // publishNftPack
    const data = req.body as PublishNftData;

    const account = {
        privateKey: process.env.PRIVATE_KEY,
        publicKeyId: 0,
        address: process.env.MOON_PLATFORM_ACCOUNT_ADDRESS
    }
    const flowAccessNode = process.env.FLOW_ACCESS_NODE;

    const transaction = await publishNftPack(data, account, flowAccessNode);

    res.status(OK).json(transaction);
}
