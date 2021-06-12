import React, { FunctionComponent, useState } from 'react';
import { Box, Button, Grid, Text, TextInput, Select } from 'grommet';
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
    {
      title: 'test-title',
      mediaFile: 'https://pbs.twimg.com/media/Cx8iU1WWEAAURRp.jpg',
      mediaType: MediaType.Image,
    },
  ];
  return (
    <>
    <Grid
    rows={['full', 'full']}
    columns={['medium', 'medium', 'medium']}
    gap="small"
    areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'nav', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
    ]}
    >
    <Box gridArea="header" background="brand" />
    <Box gridArea="nav" background="light-5" />
    <Box gridArea="main" background="light-2" />
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
  font-size: 64px;
  align-self: center;
  margin-top: 50px;
  margin-bottom: 55px;
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
