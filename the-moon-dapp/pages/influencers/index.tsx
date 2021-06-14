import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Grid, Heading, Text, TextInput, Select } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { useRouter } from 'next/router';
import NFTCard from '../../components/nftCard';
import Filter from '../../components/filter';
import { MediaType } from '../../types/media';
import styled from 'styled-components';
import { Color, Colors } from '../../styles/theme';

const Marketplace: FunctionComponent = () => {
  const [showFilter, setShowFilter] = useState(false);

  const router = useRouter();

  const handleCardClick = (title, mediaFile, mediaType) =>
    router.push({
      pathname: '/marketplace/card-details',
      query: {
        title,
        mediaFile,
        mediaType,
      },
    });

  const handleToggleFilter = () => setShowFilter(!showFilter);

  const data = [
    /** Images were deleted from reddit */
    // {
    //   title: 'test-title',
    //   mediaFile:
    //     'https://preview.redd.it/5s6rkyn1hdu61.jpg?width=640&crop=smart&auto=webp&s=b84821a66ce65290f37abad91c10198657b9d302',
    //   mediaType: MediaType.Image,
    // },
    // {
    //   title: 'test-title',
    //   mediaFile:
    //     'https://preview.redd.it/z3zkgo19mdu61.jpg?width=640&crop=smart&auto=webp&s=e5d2a884b2015a242128c28e55af21843e46620d',
    //   mediaType: MediaType.Image,
    // },
    {
      title: 'test-title',
      mediaFile: 'https://i.redd.it/oywdqqqxvau61.jpg',
      mediaType: MediaType.Image,
    },
    {
      title: 'test-title',
      mediaFile: 'https://i.redd.it/5g5y4dbtyms61.jpg',
      mediaType: MediaType.Image,
    },
    // {
    //   title: 'test-title',
    //   mediaFile: 'https://pbs.twimg.com/media/Cx8iU1WWEAAURRp.jpg',
    //   mediaType: MediaType.Image,
    // },
  ];
  return (
    <>
    <Grid
    rows={['xsmall', 'xsmall', 'xsmall','xsmall']}
    columns={['medium', 'medium', 'medium']}
    areas={[
        { name: 'search', start: [2, 1], end: [2, 1] },
        { name: 'fave_influencer', start: [0, 2], end: [1, 2] },     
        { name: 'influencer1', start: [0, 3], end: [2, 3] },  
    ]}
    >
        {/* <Box gridArea="header" background="brand" /> */}
        <Box gridArea="search" fill align="center" justify="start" pad="medium">
            <Box  width="medium" gap="medium" >
                <TextInput
                    placeholder="Search by name"
                    icon={<SearchIcon color="brand" />}
                    reverse={true}
                />
            </Box>
        </Box>
        <Box align="baseline" gridArea="fave_influencer" direction="row" justify="between" margin={{ top: '20px'}}>
            <Heading margin="none">My Favourite Influencers</Heading>
        </Box>
        <Box gridArea="influencer1" wrap={true} direction="row">
				{data.map(({ title, mediaFile, mediaType }, i) => (
					<div key={i} onClick={() => handleCardClick(title, mediaFile, mediaType)}>
						<NFTCard
							key={i}
							title={title}
							mediaFile={mediaFile}
							mediaType={mediaType}
							showMetaData={true}
						/>
					</div>
				))}
			</Box>
    </Grid>
      {/* <Box
        align="center"
        direction="row"
        margin={{ left: '100px', right: '100px' }}
        justify="end"
      >
        <Box direction="row" margin={{ right: '0px' }} width="medium">
          <TextInput
            placeholder="Search by name"
            icon={<SearchIcon color="brand" />}
            reverse={true}
          />
        </Box>
      </Box>
      <Header margin="none">My Favourite Influencers</Header>
      {showFilter && <Filter />}
      <Box wrap={true} justify="center" direction="row">
        {data.map(({ title, mediaFile, mediaType }, i) => (
          <div key={i} onClick={() => handleCardClick(title, mediaFile, mediaType)}>
            <NFTCard
              key={i}
              title={title}
              mediaFile={mediaFile}
              mediaType={mediaType}
              showMetaData={true}
            />
          </div>
        ))}
      </Box> */}
    </>
  );
};

const Header = styled(Text)`
  font-family: 'Parisienne';
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

export default Marketplace;
