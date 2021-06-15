import React, { FunctionComponent, useState, useEffect  } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Card, CardBody, CardFooter, Text } from 'grommet';

import styled from 'styled-components';
import { MediaType } from '../../types/media';

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
		<Box align="center">
			<CardContainer
				round="10px"
				width="medium"
				pad="10px"
				margin={{ horizontal: '40px' }}
			>
				<Card round="2px" pad="10px" background="light-6">
					<CardBody>
						{mediaType === MediaType.Image && <Image fit="cover" src={fileSource} />}
						{/* {mediaType === MediaType.Video && (
              <VideoElement videoFile={mediaFile} customWidth={350} />
            )} */}
					</CardBody>
					<CardFooter pad="medium" direction="row" gap="xxsmall">
						<Box>
							<Text alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
								{title}
							</Text>
							<Text alignSelf="start" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
								Rare
							</Text>
							<Text alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
								{numassets}
							</Text>
						</Box>
						<Box
							background={{
								image: 'url(/moon_logo.png)',
								size: 'cover',
							}}
							width="60px"
							height="60px"
						/>
					</CardFooter>
				</Card>
			</CardContainer>
		</Box>
	);
};

const CardContainer = styled(Box)`
	transform: scale(0.85);

`;

export default InfluencerThumbnails;
