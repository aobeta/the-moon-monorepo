import {
	Box,
	Form,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	FormField,
	TextInput,
	Text,
	Button,
} from 'grommet';
import { FunctionComponent } from 'react';
import FadeIn from 'react-fade-in';
import Skeleton from 'react-loading-skeleton';
import { Color, Colors } from '../../styles/theme';
import { UserProfile } from '../../types/user';
import Loader from '../loading/loader';
import UploadAvatar from '../upload/uploadAvatar';

interface Props {
	user: UserProfile | null;
}

const ProfileSection: FunctionComponent<Props> = (props) => {
	const { user } = props;
	// const [profileState, setProfileState] = useState<Pick<Profile, 'name' | 'bio'>>();
	const onSave = () => {
		console.log('save');
	};

	const isSaving = false;
	const userLoaded = user != null;
	return (
		<Box>
			<FadeIn>
				<Form>
					<Card
						elevation="none"
						height="medium-large"
						width="large"
						border={{ color: Colors[Color.GREY_3], size: 'small' }}
					>
						{userLoaded && (
							<>
								<CardHeader pad="medium">
									<Text color="brand" size="large">
										Profile
									</Text>
								</CardHeader>
								<CardBody pad="medium" gap="medium">
									<Box>
										<UploadAvatar imageUrl="" />
									</Box>
									<FormField
										name="tagLine"
										label="Tag Line (optional)"
										contentProps={{ width: '80%' }}
									>
										<TextInput size="small" name="tagLine" />
									</FormField>
									<FormField
										name="fullName"
										label="About Me (Optional)"
										contentProps={{ width: '80%' }}
									>
										<TextInput size="small" name="fullName" />
									</FormField>
								</CardBody>
								<CardFooter pad="medium" justify="end" background="dark-1">
									<Button
										primary
										reverse
										icon={isSaving ? <Loader /> : undefined}
										label={isSaving ? '' : 'Save'}
										size="medium"
										color="brand"
										onClick={onSave}
									/>
								</CardFooter>
							</>
						)}
						{!userLoaded && (
							<>
								<CardHeader pad="medium">
									<Skeleton width={100} height={30} />
								</CardHeader>
								<CardBody pad="medium" gap="medium">
									<Skeleton height={80} />
									<Skeleton height={80} />
									<Skeleton height={80} />
								</CardBody>
								<CardFooter pad="medium" justify="end" background="dark-1">
									<Skeleton width={80} height={30} />
								</CardFooter>
							</>
						)}
					</Card>
				</Form>
			</FadeIn>
		</Box>
	);
};

export default ProfileSection;
