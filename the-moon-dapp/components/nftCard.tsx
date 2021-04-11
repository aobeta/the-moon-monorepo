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

interface Props {
    mediaFile : File;
    title: string;
}

const NFTCard : FunctionComponent<Props> = (props : Props) => {
    const { 
        mediaFile,
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
        <Box
            round = '10px'
            alignSelf = 'center'
            background = {{
                image: 'url(/stars.webp)', 
                size: 'cover'
            }}
            width = 'medium'
            pad = '10px'
        >
            <Card
              round = '2px'
              pad = '10px'
              background = 'light-6'
            >
                <CardBody>
                    <Image
                        fit= 'cover'
                        src= {fileSource}
                    />
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
        </Box>
    )
};

export default NFTCard;
