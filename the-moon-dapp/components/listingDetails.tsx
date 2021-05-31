import { Box, Text, Select, Button } from 'grommet';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color, Colors } from '../styles/theme';
import MoonLogoSvg from '../components/svg/moon_logo';

const ListingDetails: FunctionComponent = () => (
  <ListingContainer pad="medium">
    <Box direction="row" justify="between" align="center">
      <LogoBrand>Jane Doe</LogoBrand>
      <MoonLogoSvg />
    </Box>
    <Box>
      <CardDetailsText>Bare Ass</CardDetailsText>
      <CardDetailsText>Rare #/20</CardDetailsText>
      <Box
        alignSelf="end"
        margin={{
          top: 'small',
          bottom: 'small',
        }}
      >
        <CardDetailsText>8 Assets</CardDetailsText>
        <CardDetailsText>FOR SALE</CardDetailsText>
      </Box>
      <Divider />
      <Box
        margin={{
          top: 'small',
          bottom: '60px',
        }}
      >
        <Price>$250</Price>
        <PriceLabel>Lowest price listing</PriceLabel>
      </Box>
      <Box
        margin={{
          bottom: '60px',
        }}
      >
        <Price>$1950</Price>
        <PriceLabel>Highest price sold</PriceLabel>
      </Box>
      <Select options={['-- Select listing for sale --']} value="-- Select listing for sale --" />
      <Button
        label="Select Listing"
        color="brand"
        primary
        margin={{
          top: '55px',
        }}
      />
    </Box>
  </ListingContainer>
);

const ListingContainer = styled(Box)`
  border: 2px solid ${Colors[Color.WHEAT]};
  height: 780px;
  width: 500px;
`;

const LogoBrand = styled(Text)`
  font-family: 'Parisienne';
  font-size: 1.75rem;
  color: ${Colors[Color.WHEAT]};
`;

const CardDetailsText = styled(Text)`
  font-size: 24px;
  color: ${Colors[Color.WHEAT]};
  line-height: 32px;
`;

const Divider = styled(Box)`
  border-top: 3px solid ${Colors[Color.WHEAT]};
`;

const Price = styled.h2`
  font-size: 36px;
  color: ${Colors[Color.WHEAT]};
  margin-bottom: 5px;
`;

const PriceLabel = styled.label`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: ${Colors[Color.WHEAT]};
`;

export default ListingDetails;
