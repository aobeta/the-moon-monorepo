import axios from "axios";
import { Box, Button, FileInput, Heading, Text, TextArea, Image, Paragraph, Spinner } from "grommet";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Stepper, Step } from 'react-form-stepper';
import styled from "styled-components";
import { GroupNftData } from "../types/nft";
import NFTCard from "../components/nft/nftCard";
import { MediaType } from "../types/media";
import UploadPreview from "../components/upload/uploadPreview";
import isEmpty from "lodash/isEmpty";
import { getUrlFromIpfsHash, uploadFileToIPFS } from "../utils/Ipfs";
import { useRouter } from 'next/router';

const getNftGroupings = async () => {
    const {data} = await axios.get('/api/nft/fetch/minted');

    return data as GroupNftData[];
}

const CreatePackPage : FunctionComponent = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [nftGroupings, setNftGroupings] = useState<GroupNftData[]>([]);
    const [selectedGroupings, setSelectedGroupings] = useState<string[]>([]);
    const [description, setDescription] = useState<string>('');

    const [previewImageFile, setPreviewImageFile] = useState<File>();
    const [previewImageSource, setPreviewImageSource] = useState<string>();
    const [publishBtnDisabled, setPublishBtnDisabled] = useState<boolean>(false);

    const { push } = useRouter();

    const steps = ['Select', 'Describe', "Set Preview Image",'Publish'];

    const goToStep = (step: number) => {
        setCurrentStep(step);
    }

    const incrementStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const checkDescriptionAndContinue = () => {
        if (isEmpty(description)) {
            alert("description cannot be empty");
            return;
        }

        incrementStep();
    }

    const onGroupingSelected = (groupId: string) => {
        if (selectedGroupings.includes(groupId)) {
            setSelectedGroupings(
                selectedGroupings.filter(id => id !== groupId)
            );
            return;
        }

        setSelectedGroupings([
            ...selectedGroupings,
            groupId
        ]);
    }

    const publishPack = async () => {
        const fileIpfsHash = await uploadFileToIPFS(previewImageFile);

        // start assembling data
        const groupIds = selectedGroupings;
        const previewMediaUrl = getUrlFromIpfsHash(fileIpfsHash);
        const packData = {
            previewMediaUrl,
            description
        };

        setPublishBtnDisabled(true);
        const { data } = await axios.post('/api/nft/publish/pack', { groupIds, packData });
        console.log('publish response : ', data);
        alert('Nft Pack published !');
        push('/show-packs');
    }

    useEffect(() => {
        getNftGroupings()
            .then(data => setNftGroupings(data));
    }, []);

    useEffect(() => {
        if (previewImageFile) {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', () => {
                setPreviewImageSource(fileReader.result as string);
            });

            fileReader.readAsDataURL(previewImageFile);
        }
    }, [previewImageFile])

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box pad="small">
                        <Heading level={3} margin={{ bottom : "large"}} alignSelf='center'>Select NFT's for the Pack</Heading>
                        <Box direction='row' alignSelf='center' align='center' margin={{ bottom : "medium", right: "small"}}>
                            {selectedGroupings.length > 0 && <SelectedText margin={{ right: "small"}} alignSelf='center'>{selectedGroupings.length} Selected</SelectedText>}
                            {selectedGroupings.length > 0 && <Button primary onClick={() => incrementStep()} label="Continue"/>}
                        </Box>
                        <Box direction="row">
                            {nftGroupings.map(group => (
                                <SelectionContainer
                                    selected={selectedGroupings.includes(group.groupId)}
                                    key={group.groupId}
                                    onClick = {() => onGroupingSelected(group.groupId)}
                                >
                                    <NFTCard
                                        key={group.groupId}
                                        mediaFile={group.metadata.mediaUrl}
                                        title={group.metadata.metadata.title}
                                        mediaType={MediaType.Image}
                                    />
                                </SelectionContainer>
                            ))}
                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <Box pad="large" align="center" >
                        <TextArea
                            placeholder="Add Description"
                            value={description}
                            fill={false}
                            onChange={event => setDescription(event.target.value)}
                            style={{ width : '50vw'}}
                        />
                        <Button
                            primary
                            onClick={() => incrementStep()}
                            margin="medium"
                            label="Continue"
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box pad="large" align="center">
                        {previewImageFile == null &&
                            <FileInput
                                multiple={false}
                                messages={{
                                    browse: 'or click to browse',
                                    dropPrompt: `Drop Image* file here (PNG,SVG,JPG,WEBP) file here`,
                                }}
                                onChange={(e) => {
                                    setPreviewImageFile(e.target.files[0]);
                                }}
                            />
                        }
                        {previewImageFile != null &&
                            <UploadPreview
                                file={previewImageFile}
                                mediaType={MediaType.Image}
                                onClear={() => setPreviewImageFile(undefined)}
                                onAccept={() => incrementStep()}
                                acceptAny={true}
                            />
                        }
                    </Box>
                );
            case 3:
                return (
                    <Box pad="large" align="center">
                        <Image src={previewImageSource} style={{ width: '200px'}}/>
                        <Paragraph>
                            {description}
                        </Paragraph>
                        <Button
                            primary
                            disabled={publishBtnDisabled}
                            onClick={publishPack}
                            margin="medium"
                            label="Publish"
                        />
                        {publishBtnDisabled && <Spinner size="medium" alignSelf="center"/>}
                    </Box>
                );
            default:
                return null;
        }
    }

    return (
        <Box justify="start" fill>
            <Stepper activeStep={currentStep}>
                {steps.map((stepLabel, step) => (
                    <Step key={stepLabel} label={stepLabel} onClick={() => goToStep(step)} />
                ))}
            </Stepper>
            {renderStep(currentStep)}
        </Box>
    )
};

const SelectionContainer = styled.div<{selected : boolean}>`
    border: 2px solid ${props => props.selected ? '#62bfea' : '#ccc'};
    border-radius: 10px;
    cursor: pointer;
    transform: scale(0.8);

    &:hover {
        border-color: #62bfea;
    }
`;

const SelectedText = styled(Text)`
    border: 1px solid;
    padding: 5px;
    border-radius: 5px;
`;

export async function getStaticProps(){
    return {
      props: {
        title : "Create Pack"
      }
    }
  }

export default CreatePackPage;
