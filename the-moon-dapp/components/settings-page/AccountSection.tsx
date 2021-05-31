import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Form,
	FormField,
	Text,
	TextInput,
} from 'grommet';
import { User } from '@aobeta/db-model/prisma';
import Skeleton from 'react-loading-skeleton';
import pick from 'lodash/pick';
import toast from 'react-hot-toast';
import Loader from '../loading/loader';
import { Color, Colors } from '../../styles/theme';
import { FunctionComponent, useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';

const DEFAULT_USER_STATE = {
	username: '',
	fullName: '',
	email: '',
};

const AccountSection: FunctionComponent<{ user: User | null }> = (props) => {
	const { user } = props;

	const [userState, setUserState] = useState<Pick<User, 'username' | 'email'>>();
	const [isSaving, setIsSaving] = useState<boolean>(false);

	useEffect(() => {
		if (user != null && userState == null) {
			setUserState(pick(user, ['username', 'email']));
		}
	}, [user]);

	const onSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			toast.success('Successfully saved account information');
		}, 5000);
	};

	const userLoaded = user != null;
	return (
		<Box>
			<FadeIn>
				<Form value={userState ?? DEFAULT_USER_STATE} onChange={(value) => setUserState(value)}>
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
										Account
									</Text>
								</CardHeader>
								<CardBody pad="medium" gap="medium">
									<FormField name="username" label="Username" contentProps={{ width: '80%' }}>
										<TextInput size="small" width="10px" name="username" />
									</FormField>
									<FormField name="email" label="Email" contentProps={{ width: '80%' }}>
										<TextInput size="small" name="email" disabled />
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

export default AccountSection;
