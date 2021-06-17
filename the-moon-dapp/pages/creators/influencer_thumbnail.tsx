import React, { FunctionComponent, useState, useEffect  } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Card, CardBody, CardFooter, Grid, Text } from 'grommet';
import { Color, Colors } from '../../styles/theme';
import styled from 'styled-components';
import { MediaType } from '../../types/media';
import { Favorite as FaveIcon } from 'grommet-icons';

interface Props {
	mediaFile: File | string;
	mediaType: MediaType;
	title: string;
	numassets: number;
}

const InfluencerThumbnails: FunctionComponent<Props>  = (props: Props) => {




	const { mediaFile, mediaType, title, numassets} = props;
	const router = useRouter();
	// const { title, numassets, mediaFile, mediaType } = router.query;
    const [fileSource, setFileSource] = useState<string>();
	useEffect(() => {
		if (mediaFile == null) {
			return;
		}

		if (typeof mediaFile === 'string') {
			setFileSource(mediaFile);
			return;
		}

		const fileReader = new FileReader();

		fileReader.addEventListener('load', () => {
			setFileSource(fileReader.result as string);
		});

		fileReader.readAsDataURL(mediaFile);
	}, [mediaFile]);
	return (
		<Grid
		rows={['small']}
		columns={['xsmall', 'small']}
		areas={[
			{ name: 'creatorpic', start: [0, 0], end: [0, 0] },
			{ name: 'creatordesc', start: [1, 0], end: [1, 0] }, 
			
		]}
		margin="large"
		border="all">
			<Box gridArea="creatorpic">
			{mediaType === MediaType.Image && <Image fit="cover" src={fileSource} />}
			</Box>
			<Box gridArea="creatordesc">
            <Header alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
                {title}
            </Header>
			<Box direction="row">
				<Text alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '15px' }} margin={{ left: '35px', right: '50px'}}>
					{numassets} Assets			
				</Text>
				<FaveIcon color="red"/>	
			</Box>


			</Box>				
			</Grid>

	);
};

const CardContainer = styled(Box)`
	transform: scale(0.85);

`;

const Header = styled(Text)`
  font-family: 'Parisienne';
  text-decoration: none !important;
  font-size: 64px;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 55px;
  color: ${Colors[Color.WHEAT]};
`;

export default InfluencerThumbnails;
