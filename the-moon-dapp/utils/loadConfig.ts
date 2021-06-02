import { initFlowConfig } from '@aobeta/flow-lib/transactions/server';
import { initFlowConfigClient } from '@aobeta/flow-lib/transactions/client';

const loadConfig = () => {
	initFlowConfig({
		contractAddress: process.env.MOON_NFT_CONTRACT_ADDRESS as string,
		accessNode: process.env.FLOW_ACCESS_NODE as string,
	});
};

export const loadClientConfig = () => {
	initFlowConfigClient({
		walletDiscroveryUrl: process.env.NEXT_PUBLIC_FLOW_WALLET_DISCOVERY_URL as string,
		accessNode: process.env.NEXT_PUBLIC_FLOW_ACCESS_NODE as string,
		platformSmartContractAddress: process.env.NEXT_PUBLIC_MOON_NFT_CONTRACT_ADDRESS as string,
	});
};

export default loadConfig;
