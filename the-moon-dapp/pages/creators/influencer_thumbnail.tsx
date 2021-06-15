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
		<Box align="center" border={{
			"color": "${Colors[Color.WHEAT]}",
			"size": "xsmall",
			"side": "all"
		  }}>
			<CardContainer
				round="10px"
				width="medium"
				pad="10px"
				margin={{ horizontal: '40px' }}
			>	
				<Card round="2px" pad="10px">
					<CardBody>
						{mediaType === MediaType.Image && <Image fit="cover" src={fileSource} />}
						{/* {mediaType === MediaType.Video && (
              <VideoElement videoFile={mediaFile} customWidth={350} />
            )} */}
					</CardBody>
					<CardFooter pad="medium" direction="row" gap="xxsmall">
						<Box>
							<Header alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
								{title}
							</Header>
							<Text alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
								{numassets} Assets
							</Text>
						</Box>
						<FaveIcon color="red"/>
					</CardFooter>
				</Card>
			</CardContainer>
		</Box>
	);
};

const CardContainer = styled(Box)`
	transform: scale(0.85);

`;

const Header = styled(Text)`
  font-family: 'Parisienne';
  text-decoration: none !important;
  font-size: 32px;
  align-self: center;
  color: ${Colors[Color.WHEAT]};
`;

export default InfluencerThumbnails;
