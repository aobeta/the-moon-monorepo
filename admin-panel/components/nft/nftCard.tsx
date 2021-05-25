import { Box, Image, Card, CardBody, CardFooter, Text } from 'grommet';
import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MediaType } from '../../types/media';
import VideoElement from '../media/videoElement';

interface Props {
  mediaFile: File | string;
  mediaType: MediaType;
  title: string;
  supply?: number;
}

const NFTCard: FunctionComponent<Props> = (props: Props) => {
  const { mediaFile, mediaType, title, supply = 1 } = props;

  const [fileSource, setFileSource] = useState<string>();

  useEffect(() => {
    if (mediaFile == null) {
      return;
    }

    if(typeof mediaFile == "string") {
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
    <CardContainer
      round="10px"
      background={{
        image: 'url(/stars.webp)',
        size: 'cover',
      }}
      width="250px"
      pad="10px"
    >
      <Card round="2px" pad="10px" background="light-6">
        <CardBody>
          {mediaType === MediaType.Image && <Image fit="cover" src={fileSource} />}
          {mediaType === MediaType.Video && (
            <VideoElement videoFile={mediaFile as File} customWidth={350} />
          )}
        </CardBody>
        <CardFooter pad="medium" direction="row" gap="xxsmall">
          <Box>
            <Text alignSelf="start" style={{ fontFamily: `'Caveat', cursive`, fontSize: '20px' }}>
              {title}
            </Text>
            <Text alignSelf="start" style={{ fontFamily: `'Caveat', cursive`, fontSize: '20px' }}>
              #{supply}/{supply}
            </Text>
            <Text alignSelf="start" style={{ fontSize: '20px', textTransform: 'uppercase' }}>
              Rare
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
  );
};

const CardContainer = styled(Box)`
  transform: scale(0.85);
  box-shadow: 28px 28px 40px #1a1a1a;
  animation: hoverCard 1s ease-in-out 0s infinite alternate;
`;

export default NFTCard;
