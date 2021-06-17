import * as ProfileApi from '../../api-clients/ProfileApi';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, Text, TextInput, Select, CheckBoxGroupExtendedProps } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { useRouter } from 'next/router';
import { MediaType } from '../../types/media';
import styled from 'styled-components';
import { Color, Colors } from '../../styles/theme';
import InfluencerThumbnails from './influencer_thumbnail';

const data = [
    {
      title: 'Lilly Sheriff',
	  numassets: 42,
      mediaFile: 'https://i.redd.it/oywdqqqxvau61.jpg',
      mediaType: MediaType.Image,
    },
    {
      title: 'Sarah Dimes',
	  numassets: 23,
      mediaFile: 'https://i.redd.it/5g5y4dbtyms61.jpg',
      mediaType: MediaType.Image,
    },
    {
      title: 'Belle Delphine',
	  numassets: 14,
      mediaFile: 'https://pbs.twimg.com/media/Cx8iU1WWEAAURRp.jpg',
      mediaType: MediaType.Image,
    },
  ];


const Creators: FunctionComponent = () => {

	
	const router = useRouter();
	
	const handleCardClick = (title, numassets, mediaFile, mediaType) =>
    router.push({
      pathname: '/creators/creatorDetails',
      query: {
        title,
		numassets,
        mediaFile,
        mediaType,
      },
    });

	useEffect(() => {
		/** Sample usage of profile API. make sure to throttle requests so as not to put a load on our DB */
		ProfileApi.searchForInfluencer(" ").then((result) =>
			console.log('SEARCH INFLUENCER RESULT: ', result)
		);

		


	}, []);

	const [value, setValue] = React.useState('Most Collectibles');

	return (    <Grid
		rows={['xsmall', 'xsmall', 'xsmall', 'medium', 'xsmall', 'xsmall', 'medium']}
		columns={['medium', 'medium', 'medium']}
		areas={[
			{ name: 'search', start: [2, 1], end: [2, 1] },
			{ name: 'fave_influencer_heading', start: [0, 2], end: [1, 2] },     
			{ name: 'influencer1', start: [0, 3], end: [2, 3] },  
			{ name: 'line', start: [0, 4], end: [2, 4] },
			{ name: 'influencer_heading', start: [0, 5], end: [0, 5] },
			{ name: 'sort', start: [2, 5], end: [2, 5] },  
			{ name: 'influencer2', start: [0, 6], end: [2, 6] },
		]}
		>
			<Box gridArea="search" fill align="center" justify="start" pad="medium" direction="row">
				<Box  width="medium" gap="medium" margin={{ right: '10px'}}>
					<TextInput
						placeholder="Search by name"
						icon={<SearchIcon color="brand" />}
						reverse={true}
					/>
				</Box>
			</Box>
			<Box align="baseline" gridArea="fave_influencer_heading" direction="row" justify="start" margin={{ left: '60px'}}>
				<Header margin="none">My Favourite Content Creators</Header>
			</Box>
			<Box  gridArea="influencer1"  margin={{ left: '20px'}} justify="center"direction="row" border="bottom">
			{data.map(({ title, mediaFile, mediaType, numassets }, i) => (
          		<div key={i} onClick={() => handleCardClick(title, mediaFile, numassets, mediaType)}>
				<Box height="medium" wrap={true}>
            	<InfluencerThumbnails
              	key={i}
              	title={title}
             	 mediaFile={mediaFile}
				  numassets={numassets}
              	mediaType={mediaType}
            	/>
				</Box>
          		</div>
        		))}
			</Box>
			<Box width="large" align="baseline" gridArea="influencer_heading" direction="row" justify="start" margin={{ left: '60px'}}>
				<Header margin="none">Content Creators</Header>
			</Box>
			<Box gridArea="sort" fill align="center" justify="start" > 
				<Box align="center" direction="row" margin={{ right: '30px'}}>
					<SortText>Sort By</SortText>
					<Select
						options={['Most Assets', 'Most Collectibles', 'Most Likes']}
						value={value}
						onChange={({ option }) => setValue(option)}
					/>
				</Box>
			</Box>
			<Box  gridArea="influencer2"  margin={{ left: '20px'}} justify="center"direction="row">
			{data.map(({ title, mediaFile, mediaType, numassets }, i) => (
          		<div key={i} onClick={() => handleCardClick(title, mediaFile, numassets, mediaType)}>
				<Box height="medium" wrap={true}>
            	<InfluencerThumbnails
              	key={i}
              	title={title}
             	 mediaFile={mediaFile}
				  numassets={numassets}
              	mediaType={mediaType}
            	/>
				</Box>
          		</div>
        		))}
			</Box>
		</Grid>);
};

const Header = styled(Text)`
  font-family: 'Gadugi';
  text-decoration: none !important;
  font-size: 32px;
  align-self: center;
  color: ${Colors[Color.WHEAT]};
`;

const SortText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #f7f6c9;
  margin-left: 15px;
  margin-right: 15px;
  white-space: nowrap;
`;

export default Creators;
