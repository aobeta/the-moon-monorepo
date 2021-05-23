import React, { FunctionComponent } from 'react';
import { Box, TextInput, Select } from 'grommet';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

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
      <div>Clear</div>
      <Box direction="row" justify="between">
        <Box>
          <span>Influencer</span>
          <ReactTagInput tags={['Jane Doe']} onChange={() => ['tom']} />
        </Box>
        <Box>
          <span>Type</span>
          <ReactTagInput tags={['Ass']} onChange={() => []} />
        </Box>
        <Box>
          <span>Rarity</span>
          <Select options={['Rarity']} value="Rarity" />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
