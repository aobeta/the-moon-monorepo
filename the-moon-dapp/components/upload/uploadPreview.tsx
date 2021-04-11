import { 
    Box, 
    Button, 
    Image, 
}                                       from "grommet";
import React, { 
    FunctionComponent, 
    useEffect, 
    useState, 
}                                       from "react";
import styled from "styled-components";
import { MediaType }                    from "../../types/media";

interface Props {
    file: File,
    mediaType: MediaType,
    onClear: () => void,
    onAccept: () => void
}

const UploadPreview : FunctionComponent<Props> = (props: Props) => {
    const {
        file,
        onAccept,
        onClear,
        mediaType,
    } = props;

    // const [fileSource, setFileSource] = useState<string>();
    
    // useEffect(() => {
    //     if (mediaType === MediaType.Image) {
    //         const fileReader = new FileReader();

    //         fileReader.addEventListener('load', () => {
    //             setFileSource(fileReader.result as string);
    //         });

    //         fileReader.readAsDataURL(file);
    //     }
    // }, [file]);
    const fileUrl = URL.createObjectURL(file);

    const renderMedia = () => {
        switch (mediaType) {
            case MediaType.Image:
                return (
                    <Image
                        alignSelf = 'center'
                        src={fileUrl}
                        style = {{ borderRadius : '5px', maxWidth: '400px'}}
                    />
                );
            case MediaType.Video:
                return null;
            default:
                return null;
        }
    }

    return (
        <Box pad ='large' justify = 'center' alignSelf = 'center' fill = {true}>
            {renderMedia()}
            <Box width = 'medium' alignSelf = 'center'>
                <Button primary label='Use File' color = 'brand' margin = 'medium' onClick = { onAccept }/>
                <Button alignSelf = 'center' plain label='Use another' color = 'brand' onClick = { onClear }/>
            </Box>
        </Box>
    );
};

const ImageBox = styled(Image)`
    border-radius: 5px;
    max-width: 400px;
`;

export default UploadPreview;
