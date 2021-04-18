import { Box, Button, Image } from 'grommet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DisplayAcceptedMediaTypes, MediaType } from '../../types/media';
import VideoElement from '../media/videoElement';
import toast from 'react-hot-toast';

interface Props {
  file: File;
  mediaType: MediaType;
  onClear: () => void;
  onAccept: () => void;
}

const AcceptedMediaTypes: Record<MediaType, string[]> = {
  [MediaType.Image]: ['image/jpeg', 'image/png'],
  [MediaType.Video]: ['video/mp4'],
  [MediaType.Audio]: [],
};

const UploadPreview: FunctionComponent<Props> = (props: Props) => {
  const { file, onAccept, onClear, mediaType } = props;

  const [fileSource, setFileSource] = useState<string>();

  useEffect(() => {
    verifyFileInput(file);

    if (mediaType === MediaType.Image) {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        setFileSource(fileReader.result as string);
      });

      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const verifyFileInput = (file: File) => {
    const acceptedMediaTypes: string[] = AcceptedMediaTypes[mediaType];

    if (!acceptedMediaTypes.includes(file.type)) {
      toast.error(`Please Upload only ${DisplayAcceptedMediaTypes[mediaType]} file.`);
      onClear();
      return;
    }
  };

  const renderMedia = () => {
    switch (mediaType) {
      case MediaType.Image:
        return <ImageBox alignSelf="center" src={fileSource} />;
      case MediaType.Video:
        return <VideoElement videoFile={file} />;
      default:
        return null;
    }
  };

  return (
    <Box pad="large" justify="center" alignSelf="center" fill={true}>
      {renderMedia()}
      <Box width="medium" alignSelf="center">
        <Button primary label="Use File" color="brand" margin="medium" onClick={onAccept} />
        <Button alignSelf="center" plain label="Use another" color="brand" onClick={onClear} />
      </Box>
    </Box>
  );
};

const ImageBox = styled(Image)`
  border-radius: 5px;
  max-width: 400px;
`;

export default UploadPreview;
