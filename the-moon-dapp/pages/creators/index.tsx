import { Box } from 'grommet';
import { FunctionComponent, useEffect } from 'react';
import * as ProfileApi from '../../api-clients/ProfileApi';

const PacksPage: FunctionComponent = () => {
	useEffect(() => {
		/** Sample usage of profile API. make sure to throttle requests so as not to put a load on our DB */
		ProfileApi.searchForInfluencer('mer').then((result) =>
			console.log('SEARCH INFLUENCER RESULT: ', result),
		);
	}, []);

	return <Box>Creators</Box>;
};

export default PacksPage;
