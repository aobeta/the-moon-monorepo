import { MoonNftPackData } from '@aobeta/flow-lib/types/Nft';
import axios from 'axios';
import { Box, Heading, Image, Paragraph } from 'grommet';
import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

const Home: FunctionComponent = () => {
	const [packs, setPacks] = useState<MoonNftPackData[]>([]);

	useEffect(() => {
		// axios.get('/api/nft/packs').then(({ data }) => {
		// 	setPacks(data);
		// });
	}, []);

	return (
		<Box fill pad="large">
			<StyledHeading color="brand" level="1" alignSelf="center">
				Featured Packs
			</StyledHeading>
			<Box margin={{ top: 'large' }} fill direction="row" justify="center">
				{packs.map((pack) => (
					<Box key={pack.id} align="center">
						<Image src={pack.previewMediaUrl} style={{ width: '200px' }} />
						<Paragraph size="small" color="brand">
							{pack.description}
						</Paragraph>
					</Box>
				))}
			</Box>
		</Box>
	);
};

const StyledHeading = styled(Heading)`
	font-family: 'Parisienne';
`;

export default Home;
