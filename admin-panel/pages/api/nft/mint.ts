// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { mintMoonNft } from "@aobeta/flow-lib/transactions/server";
import { MintMoonNftData } from "@aobeta/flow-lib/transactions/server/mintMoonNft";
import * as uuid from "uuid";
import { AuthAccountDetails } from "@aobeta/flow-lib/types/AuthAccount";

export default async (req : NextApiRequest, res: NextApiResponse) => {
  const body = req.body as MintMoonNftData;
  const data = {
    ...body,
    groupId : uuid.v4(),
  }

  console.log("NFT DATA : ", data);

  const account : AuthAccountDetails = {
    privateKey: process.env.PRIVATE_KEY,
    publicKeyId: 0,
    address: process.env.MOON_PLATFORM_ACCOUNT_ADDRESS
  }

  const flowAccessNode = process.env.FLOW_ACCESS_NODE

  const transaction = await mintMoonNft(data, account, flowAccessNode)

  res.status(200).json(transaction)
}
