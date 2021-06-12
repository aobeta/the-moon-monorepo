import { Box, Button, Card, CardBody, CardHeader, Text } from 'grommet';
import { FunctionComponent, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useUser } from '../../context/UserProvider';
import { Colors, Color } from '../../styles/theme';

/** WARNING: This component requires an authenticated user */
const WalletSection: FunctionComponent = () => {
	const { connectUserWallet, resolving, user } = useUser();
	const userLoaded = useMemo(() => !resolving, [resolving]);

	const onConnectUserWallet = () => {
		connectUserWallet();
	};

	return (
		<Card
			elevation="none"
			height="medium-large"
			width="large"
			border={{ color: Colors[Color.GREY_3], size: 'small' }}
		>
			{userLoaded && (
				<>
					<CardHeader pad="medium">
						<Text color="brand" size="large">
							Wallet
						</Text>
					</CardHeader>
					<CardBody pad="medium" gap="medium">
						{user?.wallet && (
							<Box>
								<Text>{user.wallet.address}</Text>
								<Text>{user.wallet.walletProvider}</Text>
							</Box>
						)}
						{user?.wallet == null && (
							<Button primary label="Connect Wallet" onClick={onConnectUserWallet} />
						)}
					</CardBody>
				</>
			)}
			{!userLoaded && (
				<>
					<CardHeader pad="medium">
						<Skeleton width={100} height={30} />
					</CardHeader>
					<CardBody pad="medium" gap="medium">
						<Skeleton height={80} />
					</CardBody>
				</>
			)}
		</Card>
	);
};

export default WalletSection;
