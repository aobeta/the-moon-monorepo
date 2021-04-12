import { Volume, VolumeMute } from "grommet-icons";
import { FunctionComponent, useState }        from "react";
import styled from "styled-components";

interface Props {
    videoFile: File;
    customWidth?: number
}

const DEFAULT_VIDEO_WIDTH = 400;

const VideoElement : FunctionComponent<Props> = (props : Props) => {
    const { 
        videoFile, 
        customWidth 
    } = props;

    const [videoMuted, setVideoMuted] = useState<boolean>(true);
    const fileSource = URL.createObjectURL(videoFile);

    const toggleMute = () => {
        setVideoMuted(!videoMuted);
    }
    
    return (
        <StackContainer>
            <Video 
                autoPlay
                loop
                muted = {videoMuted}
                controls={false}
                customWidth = {customWidth}
            >
                <source key="video" src={fileSource} type="video/mp4" />
            </Video>
            {videoMuted && <ClickableVolumeMute color = 'brand' size = 'medium' onClick = { toggleMute }/>}
            {!videoMuted && <ClickableVolume color = 'brand' size = 'medium' onClick = { toggleMute }/>}
        </StackContainer>
    );
}

const Video = styled.video<{ customWidth? : number }>`
    width: ${props => props.customWidth ?? DEFAULT_VIDEO_WIDTH}px;
    border-radius: 5px;
`;

const StackContainer = styled.div`
    position: relative;
    align-self: center;

    svg {
        position: absolute;
        bottom: 15px;
        right: 15px;
        z-index: 1;
    }
`;

const ClickableVolume = styled(Volume)`
    cursor: pointer;
`;

const ClickableVolumeMute = styled(VolumeMute)`
    cursor: pointer;
`;

export default VideoElement;
