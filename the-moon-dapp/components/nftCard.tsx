import { 
    Box,
    Image,
    Card,
    CardBody,
    CardFooter,
    Text, 
}                                       from "grommet";
import React, { 
    FunctionComponent, 
    useState,
    useEffect, 
}                                       from "react";
import styled from "styled-components";
import { MediaType }                    from "../types/media";
import VideoElement                     from "./media/videoElement";

interface Props {
    mediaFile : File;
    mediaType: MediaType;
    title: string;
}

const NFTCard : FunctionComponent<Props> = (props : Props) => {
    const { 
        mediaFile,
        mediaType,
        title,
    } = props;

    const [supply, setSupply] = useState<number>(1);

    const [fileSource, setFileSource]   = useState<string>();
    
    useEffect(() => {
        if (mediaFile == null) {
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
            round = '10px'
            background = {{
                image: 'url(/stars.webp)', 
                size: 'cover'
            }}
            width = 'medium'
            pad = '10px'
            margin = {{ horizontal : '40px'}} 
        >
            <Card
              round = '2px'
              pad = '10px'
              background = 'light-6'
            >
                <CardBody>
                    {mediaType === MediaType.Image && 
                        <Image
                            fit= 'cover'
                            src= {fileSource}
                        />
                    }
                    {mediaType === MediaType.Video && <VideoElement videoFile = {mediaFile} customWidth = {350} />}
                </CardBody>
                <CardFooter pad ='medium' direction = 'row' gap = 'xxsmall'>
                    <Box>
                        <Text alignSelf = 'start' style = {{ fontFamily: `'Caveat', cursive`, fontSize: '20px'}}>{title}</Text>
                        <Text alignSelf = 'start' style = {{ fontFamily: `'Caveat', cursive`, fontSize: '20px'}}>#{supply}/{supply}</Text>
                        <Text alignSelf = 'start' style = {{ fontSize: '20px', textTransform : 'uppercase'}}>Rare</Text>
                    </Box>
                    <Box
                        background = {{
                            image: 'url(/moon_logo.png)',
                            size: 'cover',
                        }}
                        width = '60px'
                        height = '60px'
                    />
                </CardFooter>
            </Card>
        </CardContainer>
    )
};

const CardContainer = styled(Box)`
    transform: scale(0.85);
    box-shadow: 60px 82px 56px #1a1a1a;
    animation: hoverCard 1s ease-in-out 0s infinite alternate;
`;

export default NFTCard;
