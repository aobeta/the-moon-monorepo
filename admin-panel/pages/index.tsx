import {
	Box,
	BoxTypes,
	Button,
	Card,
	FileInput,
	Heading,
	Paragraph,
	Text,
	TextArea,
	TextExtendedProps,
	TextInput,
} from 'grommet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import FadeIn from 'react-fade-in';
import { IconProps, Video } from 'grommet-icons';
import styled from 'styled-components';
import empty from 'lodash/isEmpty';
import { DisplayAcceptedMediaTypes, MediaType } from '../types/media';
import UploadPreview from '../components/upload/uploadPreview';
import NFTCard from '../components/nftCard';
import { useRouter } from 'next/router';
import { withQueryParams } from '../utils/queryParams';

const validateMediaType = (type: string | MediaType) => {
	switch (type) {
		case MediaType.Image:
		case MediaType.Video:
		case MediaType.Audio:
			return true;
		default:
			return false;
	}
};

const MAX_DESCRIPTION_LENGTH = 550;
const MAX_TITLE_LENGTH = 50;

const mediaTypeIsDisabled = (mediaType: MediaType) => {
	return mediaType === MediaType.Audio;
};

const MediaTypeArray = Object.keys(MediaType) as MediaType[];

const MintPage: FunctionComponent = () => {
	const [currentStep, setCurrentStep] = useState<number>(-2);
	const [mediaType, setMediaType] = useState<MediaType>();
	const [mediaFile, setMediaFile] = useState<File>();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [errorText, setErrorText] = useState<string>();
	const [nftPrice, setNftPrice] = useState<string>('');

	const { pathname, push, query } = useRouter();

	const steps = ['Upload', 'Describe', 'Mint'];

	const onMediaTypeSelected = (mediaType: MediaType) => {
		push(withQueryParams(pathname, { mediaType }));
	};

	const incrementStep = () => {
		if (currentStep == null) {
			return;
		}
		setCurrentStep(currentStep + 1);
	};

	const goToStep = (step: number) => {
		setCurrentStep(step);
	};

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
	};

	useEffect(() => {
		if (query.mediaType != null && validateMediaType(query.mediaType as string)) {
			setMediaType(query.mediaType as MediaType);
			setCurrentStep(0);
		} else {
			setCurrentStep(-1);
		}
	}, [query.mediaType]);

	const renderStep = (step: number) => {
		switch (step) {
			case -1:
				return (
					<>
						<Heading margin={{ bottom: '80px' }} level={3} alignSelf="center" color="neutral-3">
							Select Media Type
						</Heading>
						<Box direction="row-responsive" justify="around">
							{MediaTypeArray.map((mediaType) => (
								<Button
									disabled={mediaTypeIsDisabled(mediaType)}
									key={mediaType}
									onClick={() => onMediaTypeSelected(mediaType)}
								>
									<ClickableCard {...cardProps}>
										<Video {...iconProps} />
										<Text {...textProps}>{mediaType}</Text>
										<Text {...subTextProps}>{DisplayAcceptedMediaTypes[mediaType]}</Text>
										{mediaTypeIsDisabled(mediaType as MediaType) && (
											<Text {...subTextProps}>(Coming Soon)</Text>
										)}
									</ClickableCard>
								</Button>
							))}
						</Box>
					</>
				);
			case 0:
				return (
					<Box
						pad={{
							horizontal: '150px',
						}}
						height="medium"
					>
						{mediaFile == null && (
							<FileInput
								name="NFTMedia"
								multiple={false}
								messages={{
									browse: 'or click to browse',
									dropPrompt: `Drop ${DisplayAcceptedMediaTypes[mediaType as MediaType]} file here`,
								}}
								onChange={(e) => {
									if (e.target.files) setMediaFile(e.target.files[0]);
								}}
							/>
						)}
						{mediaFile != null && (
							<UploadPreview
								file={mediaFile}
								mediaType={mediaType as MediaType}
								onClear={() => setMediaFile(undefined)}
								onAccept={() => incrementStep()}
							/>
						)}
					</Box>
				);
			case 1:
				return (
					<Box pad={{ top: 'medium' }}>
						<Box
							border
							round
							pad="medium"
							alignSelf="center"
							justify="center"
							width="60%"
							background="dark-1"
						>
							<Heading level={3} margin="none">
								Describe your NFT
							</Heading>
							<Paragraph>
								Add a title and description for your NFT. Once minted these details cannot be
								changed.
							</Paragraph>
							<Box>
								<TextInput
									maxLength={MAX_TITLE_LENGTH}
									placeholder="Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<Text alignSelf="end" size="xsmall" margin="xsmall">
									{title.length}/{MAX_TITLE_LENGTH}
								</Text>
							</Box>
							<Box>
								<MediumTextArea
									maxLength={MAX_DESCRIPTION_LENGTH}
									placeholder="Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<Text alignSelf="end" size="xsmall" margin="xsmall">
									{description.length}/{MAX_DESCRIPTION_LENGTH}
								</Text>
							</Box>
							<Button
								primary
								label="Continue"
								color="neutral-3"
								onClick={validateTitleOrDescriptionBeforeContinuing}
							/>
							<ErrorText
								size="small"
								color="status-error"
								alignSelf="center"
								visible={errorText != null}
							>
								{errorText ?? 'ErrorText'}
							</ErrorText>
						</Box>
					</Box>
				);
			case 2:
				return (
					<Box
						pad={{
							vertical: 'medium',
							horizontal: 'none',
						}}
						direction="row"
						alignContent="center"
						justify="center"
					>
						<FadeIn>
							<NFTCard
								mediaFile={mediaFile as File}
								mediaType={mediaType as MediaType}
								title={title}
							/>
						</FadeIn>
						<FadeIn>
							<Box
								round
								justify="center"
								width="medium"
								margin={{ horizontal: '40px' }}
								background="background-primary"
							>
								<Heading level={3} margin="none">
									Set Price and Royalties
								</Heading>
								<Paragraph size="small">
									Set Price, royalties and how many of this NFT you would like to mint. Once minted
									these details cannot be changed.
								</Paragraph>
								<Box margin={{ vertical: 'xsmall' }}>
									<TextInput
										type="number"
										focusIndicator={false}
										icon={<div>$</div>}
										placeholder="Price"
										value={nftPrice}
										onChange={(e) => setNftPrice(e.target.value)}
									/>
									<SupportingMessage size="xsmall" alignSelf="center" visible={!empty(nftPrice)}>
										0.55 ETH
									</SupportingMessage>
								</Box>
								<Box margin={{ vertical: 'xsmall' }}>
									<TextInput type="number" focusIndicator={false} placeholder="Royalty %" />
									<SupportingMessage size="xsmall" alignSelf="center" visible>
										The Moon also adds a 5% royalty on top of yours
									</SupportingMessage>
								</Box>
								<Box margin={{ vertical: 'xsmall' }}>
									<TextInput
										type="number"
										max={1000}
										focusIndicator={false}
										placeholder="Quantity"
									/>
									<SupportingMessage size="xsmall" alignSelf="center" visible>
										Only 1000 editions of an NFT can be minted at this time
									</SupportingMessage>
								</Box>
								<Button
									primary
									label="Mint"
									color="neutral-3"
									margin="xsmall"
									onClick={validateTitleOrDescriptionBeforeContinuing}
								/>
							</Box>
						</FadeIn>
					</Box>
				);
			default:
				return null;
		}
	};

	return (
		<Box justify="center" fill>
			{currentStep >= 0 && (
				<FadeIn>
					<Stepper activeStep={currentStep}>
						{steps.map((stepLabel, step) => (
							<Step key={stepLabel} label={stepLabel} onClick={() => goToStep(step)} />
						))}
					</Stepper>
					{renderStep(currentStep)}
				</FadeIn>
			)}
			{currentStep < 0 && (
				<FadeIn>
					<Box
						justify="center"
						direction="column"
						margin={{
							top: '20px',
						}}
					>
						{renderStep(currentStep)}
					</Box>
				</FadeIn>
			)}
		</Box>
	);
};

// const stepperStyleConfig = {
// 	activeBgColor: Colors[Color.WHEAT],
// 	activeTextColor: Colors[Color.GREY_8],
// 	completedBgColor: Colors[Color.WHEAT],
// 	completedTextColor: Colors[Color.GREY_8],
// 	inactiveBgColor: '#999',
// 	inactiveTextColor: '#ccc',
// 	size: '1.4em',
// 	circleFontSize: '0.7rem',
// 	labelFontSize: '0.8rem',
// 	borderRadius: '50%',
// 	fontWeight: '400',
// };

const cardProps: BoxTypes = {
	elevation: 'none',
	justify: 'center',
	align: 'center',
	height: '300px',
	width: '300px',
	background: 'light-3',
	responsive: true,
	border: {
		color: 'neutral-3',
	},
};

const MediumTextArea = styled(TextArea)`
	height: 100px;
`;

const iconProps: IconProps = {
	color: 'neutral-3',
	size: 'large',
};

const textProps: TextExtendedProps = {
	margin: {
		top: 'medium',
	},
	color: 'neutral-3',
	size: 'medium',
};

const subTextProps: TextExtendedProps = {
	color: 'neutral-3',
	size: 'xsmall',
};

const ClickableCard = styled(Card)<BoxTypes>``;

interface ErrorTextProps extends TextExtendedProps {
	visible: boolean;
}

const ErrorText = styled(Text)<ErrorTextProps>`
	visibility: ${(props: ErrorTextProps) => (props.visible ? 'visible' : 'hidden')};
	margin-top: 5px;
`;

const SupportingMessage = styled(Text)<ErrorTextProps>`
	visibility: ${(props: ErrorTextProps) => (props.visible ? 'visible' : 'hidden')};
	margin-top: 5px;
`;

export async function getStaticProps(){
  return {
    props: {
      title : "Mint NFT"
    }
  }
}

export default MintPage;
