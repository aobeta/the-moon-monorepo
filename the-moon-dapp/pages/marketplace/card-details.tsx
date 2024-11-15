import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Box } from 'grommet';
import NFTCard from '../../components/nftCard';
import ListingDetails from '../../components/listingDetails';
import styled from 'styled-components';
import { MediaType } from '../../types/media';

const CardDetails: FunctionComponent = () => {
	const router = useRouter();
	const { title, mediaFile, mediaType } = router.query;

	return (
		<Box
			direction="row"
			margin={{
				bottom: '95px',
			}}
		>
			<Box basis="3/4">
				<NFTCard
					title={title as string}
					mediaFile={mediaFile as string}
					mediaType={mediaType as MediaType}
					showMetaData={false}
				/>
				<Box direction="row" justify="evenly">
					<NFTCardThumbnail>
						<NFTCard
							title={title as string}
							mediaFile={mediaFile as string}
							mediaType={mediaType as MediaType}
							showMetaData={false}
						/>
					</NFTCardThumbnail>
					<NFTCardThumbnail>
						<NFTCard
							title={title as string}
							mediaFile={mediaFile as string}
							mediaType={mediaType as MediaType}
							showMetaData={false}
						/>
					</NFTCardThumbnail>
					<NFTCardThumbnail>
						<NFTCard
							title={title as string}
							mediaFile={mediaFile as string}
							mediaType={mediaType as MediaType}
							showMetaData={false}
						/>
					</NFTCardThumbnail>
				</Box>
			</Box>
			<Box
				margin={{
					top: '45px',
					right: '50px',
				}}
			>
				<ListingDetails />
			</Box>
		</Box>
	);
};

const NFTCardThumbnail = styled.div`
	width: 105px;
	height: 170px;
`;

export default CardDetails;
