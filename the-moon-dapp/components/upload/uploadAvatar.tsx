import { Avatar } from 'grommet';
import { FunctionComponent } from 'react';

type StandardizedSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

interface Props {
	imageUrl: string;
	size?: StandardizedSize;
	margin?: StandardizedSize;
}

const DEFAULT_SIZE = 'medium';

const UploadAvatar: FunctionComponent<Props> = (props) => {
	const { imageUrl, size = DEFAULT_SIZE } = props;

	return (
		<div>
			<Avatar src={imageUrl} size={size} margin="xsmall" />;
		</div>
	);
};

export default UploadAvatar;
