import { initFlowConfig } from '@aobeta/flow-lib/transactions/server';

const loadConfig = () => {
	initFlowConfig({
		contractAddress: process.env.MOON_NFT_CONTRACT_ADDRESS as string,
		accessNode: process.env.FLOW_ACCESS_NODE as string,
	});
};

export default loadConfig;
