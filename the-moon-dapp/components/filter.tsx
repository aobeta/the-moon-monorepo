import React, { FunctionComponent } from 'react';
import { Box, Select, Text } from 'grommet';
import styled from 'styled-components';
import ReactTagInput from '@pathofdev/react-tag-input';

const Filter: FunctionComponent = () => {
  return (
    <Box
      margin={{ left: '175px', right: '111px', top: '15px' }}
      justify="between"
      border={{ size: '1px' }}
      pad={{
        top: '24px',
        bottom: '70px',
        left: '50px',
        right: '100px',
      }}
    >
      <UppercaseButton>Clear</UppercaseButton>
      <Box direction="row" justify="between">
        <Box>
          <BoldText>Influencer</BoldText>
          <ReactTagInput tags={['Jane Doe']} onChange={() => ['tom']} />
        </Box>
        <Box>
          <BoldText>Type</BoldText>
          <ReactTagInput tags={['Ass']} onChange={() => []} />
        </Box>
        <Box>
          <BoldText>Rarity</BoldText>
          <Select options={['Rarity']} value="Rarity" />
        </Box>
      </Box>
    </Box>
  );
};

const BoldText = styled(Text)`
  color: #f7f6c9;
  font-size: 14px;
  font-weight: bold;
`;

const UppercaseButton = styled(BoldText)`
  text-transform: uppercase;
`;

export default Filter;
