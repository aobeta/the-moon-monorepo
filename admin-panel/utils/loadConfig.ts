import { initFlowConfig } from "@aobeta/flow-lib/transactions/server";

const loadConfig = () => {
    initFlowConfig({
        contractAddress : process.env.MOON_NFT_CONTRACT_ADDRESS,
        accessNode: process.env.FLOW_ACCESS_NODE
    })
}

export default loadConfig;
