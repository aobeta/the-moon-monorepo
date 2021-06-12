import { FunctionComponent } from 'react';
import { Grommet, Main } from 'grommet';
import { dark } from 'grommet/themes';
import { Toaster } from 'react-hot-toast';
import { Color, Colors, theme } from '../../styles/theme';
import Header from './header';
import { SkeletonTheme } from 'react-loading-skeleton';

const Layout: FunctionComponent = ({ children }) => (
	<Grommet
		theme={{
			...dark,
			...theme,
		}}
		themeMode="dark"
		background="background-primary"
	>
		<SkeletonTheme color={Colors[Color.GREY_8]} highlightColor={Colors[Color.GREY_3]}>
			<Header />
			<Main background="background-primary" pad="xsmall" fill overflow="inherit">
				{children}
			</Main>
			<Toaster
				position="bottom-right"
				reverseOrder={false}
				toastOptions={{
					style: {
						border: '1px solid #713200',
						backgroundColor: Colors[Color.GREY_8],
						color: Colors[Color.WHEAT],
					},
				}}
			/>
		</SkeletonTheme>
	</Grommet>
);

export default Layout;
