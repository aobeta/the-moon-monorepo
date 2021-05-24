import Head from 'next/head';
import { ComponentType, FunctionComponent } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
import UserProvider from '../context/UserProvider';

const DEFAULT_PAGE_TITLE = 'The Moon';
interface AppProps {
	Component: ComponentType;
	pageProps: Record<string, string>;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
	const { title = DEFAULT_PAGE_TITLE } = pageProps;

	return (
		<UserProvider>
			<Layout>
				<Head>
					<title>{title}</title>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	);
};

export default MyApp;
