import { 
    Box, 
    BoxTypes, 
    Button, 
    Card, 
    FileInput, 
    Heading,
    Image, 
    Paragraph, 
    Text,
    TextArea,
    TextExtendedProps,
    TextInput
}                                                       from "grommet";
import React, { 
    FunctionComponent, 
    useEffect, 
    useState, 
}                                                       from "react";
import { 
    Stepper, 
    Step, 
}                                                       from 'react-form-stepper';
import FadeIn                                           from 'react-fade-in';
import { 
    IconProps, 
    Image as ImageIcon, 
    Video 
}                                                       from 'grommet-icons';
import styled                                           from 'styled-components';
import empty                                            from 'lodash/isEmpty';
import { MediaType }                                    from "../../types/media";
import UploadPreview                                    from "../../components/upload/uploadPreview";
import NFTCard                                          from "../../components/nftCard";
import { Color, Colors } from "../../styles/theme";


const AcceptedMediaTypes = {
    [MediaType.Audio]: 'MP3',
    [MediaType.Video]: 'MP4',
    [MediaType.Image]: 'JPEG or PNG',
}

const MAX_DESCRIPTION_LENGTH = 550;
const MAX_TITLE_LENGTH = 50;


const MintPage : FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [mediaType, setMediaType] = useState<MediaType>();
    const [mediaFile, setMediaFile]     = useState<File>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errorText, setErrorText] = useState<string>();

    const steps = [
        'Upload', 
        'Describe', 
        'Mint',
    ];

    const onMediaTypeSelected = (media: MediaType) => {
        // push(withQueryParams(pathname, { media }))
        setMediaType(media);
        setCurrentStep(currentStep + 1);
    }

    const incrementStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const goToStep = (step: number) => {
        setCurrentStep(step);
    }

    const validateTitleOrDescriptionBeforeContinuing = () => {
        if (empty(title)) {
            setErrorText('Title cannot be empty');
            return;
        }

        if (empty(description)) {
            setErrorText('Description cannot be empty');
            return;
        }

        setErrorText(undefined);
        incrementStep();
    }

    const renderStep = (step: number) => {
        switch (step) {
            case -1:
                return (
                    <>
                        <Heading margin={{ bottom : '80px' }} level = {3} alignSelf = 'center'>Select Media Type</Heading>
                        <Box 
                            direction = 'row-responsive'
                            justify = 'around'
                        >
                            {Object.keys(MediaType).map((mediaType : MediaType) => 
                                <ClickableCard key = {mediaType} {...cardProps} onClick = { () => onMediaTypeSelected(mediaType) }>
                                    <Video {...iconProps}/>
                                    <Text {...textProps}>{mediaType}</Text>
                                    <Text {...subTextProps}>{AcceptedMediaTypes[mediaType]}</Text>
                                </ClickableCard>
                            )}
                        </Box>
                    </>
                );
            case 0:
                return (
                    <Box 
                      pad = 'large'
                      height = 'medium'
                    >
                        {mediaFile == null && 
                            <FileInput
                              name='NFTMedia'
                              multiple = {false}
                              messages = {{
                                  browse: 'or click to browse',
                                  dropPrompt: `Drop ${AcceptedMediaTypes[mediaType]} file here`
                              }}
                              onChange = {(e) => setMediaFile(e.target.files[0])}
                            />
                        }
                        {mediaFile != null && 
                            <UploadPreview
                                file={mediaFile}
                                mediaType={mediaType}
                                onClear={() => setMediaFile (undefined)}
                                onAccept={() => incrementStep()}
                            />
                        }
                    </Box>
                );
            case 1:
                return (
                    <Box pad = {{ top : 'medium'}}>
                        <Box 
                          border
                          round
                          pad = 'medium'
                          alignSelf = 'center'
                          justify = 'center'  
                          width = '60%' 
                          background = 'dark-1'
                        >
                            <Heading level = {3} margin = 'none'>Describe your NFT</Heading>
                            <Paragraph>
                                Add a title and description for your NFT. Once minted these details cannot be changed.
                            </Paragraph>
                            <Box>
                                <TextInput 
                                  maxLength = {MAX_TITLE_LENGTH} 
                                  placeholder = 'Title'
                                  value = {title}
                                  onChange = {(e) => setTitle(e.target.value)}
                                />
                                <Text alignSelf = 'end' size ='xsmall' margin = 'xsmall'>{title.length}/{MAX_TITLE_LENGTH}</Text>
                            </Box>
                            <Box>
                                <MediumTextArea 
                                  maxLength = {MAX_DESCRIPTION_LENGTH} 
                                  placeholder = 'Description'
                                  value = {description}
                                  onChange = {(e) => setDescription(e.target.value)} 
                                />
                                <Text alignSelf = 'end' size ='xsmall' margin = 'xsmall'>{description.length}/{MAX_DESCRIPTION_LENGTH}</Text>
                            </Box>
                            <Button primary label='Continue' color = 'brand' onClick = { validateTitleOrDescriptionBeforeContinuing }/>
                            <ErrorText 
                              size = 'small' 
                              color = 'status-error' 
                              alignSelf = 'center'
                              visible = {errorText != null}
                            >
                                {errorText ?? 'ErrorText'}
                            </ErrorText>
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <Box 
                      pad = {{
                          vertical: 'small',
                          horizontal: 'none'
                      }}
                      direction = 'row'
                      justify = 'center'
                    >
                        <FadeIn>
                            <NFTCard 
                            mediaFile = { mediaFile }
                            title = {title} 
                            />
                        </FadeIn>
                    </Box>
                )
            default:
                return null;
        }
    }

    return (
        <Box justify = 'center' fill={true}>
            {currentStep >= 0 && 
                <FadeIn>
                    <Stepper 
                      activeStep={currentStep}
                      styleConfig={stepperStyleConfig}
                    >
                        {steps.map((stepLabel, step) => 
                            <Step key = {stepLabel} label = {stepLabel} onClick = {() => goToStep(step)}/>
                        )}
                    </Stepper>
                    {renderStep(currentStep)}
                </FadeIn>
            }
            {currentStep < 0 && 
                <FadeIn>
                    <Box 
                      justify = 'center'
                      direction = 'column'
                      margin = {{
                          top : '20px'
                      }}
                    >
                        {renderStep(currentStep)}
                    </Box>
                </FadeIn>
            }
        </Box>
    );
}

const stepperStyleConfig = {
    activeBgColor: Colors[Color.WHEAT],
    activeTextColor: Colors[Color.GREY_8],
    completedBgColor: Colors[Color.WHEAT],
    completedTextColor: Colors[Color.GREY_8],
    inactiveBgColor: '#999',
    inactiveTextColor: "#ccc",
    size: '2em',
    circleFontSize: '1rem',
    labelFontSize: '0.875rem',
    borderRadius: '50%',
    fontWeight: '500'
};

const cardProps : BoxTypes = {
    elevation : 'none', 
    justify : 'center', 
    align : 'center',  
    height:"300px", 
    width:"300px", 
    background:"dark-1",
    responsive : true,
    border: {
        color: 'brand'
    }
};

const MediumTextArea = styled(TextArea)`
    height: 150px;
`;

const iconProps : IconProps =  {
    color : 'brand',
    size : 'large',
};

const textProps : TextExtendedProps = {
    margin: {
        top : 'medium'
    },
    color: 'brand',
    size : 'medium'
};

const subTextProps : TextExtendedProps = {
    color: 'brand',
    size: 'xsmall'
}

const ClickableCard = styled(Card)<BoxTypes>`
    cursor: pointer;
`;

interface ErrorTextProps extends TextExtendedProps {
    visible: boolean;
}

const ErrorText = styled(Text)<ErrorTextProps>`
    visibility: ${(props: ErrorTextProps) => props.visible ? 'visible' : 'hidden'};
    margin-top: 5px;
`;

export default MintPage;
