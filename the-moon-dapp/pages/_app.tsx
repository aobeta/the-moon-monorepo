import Head from 'next/head';
import { ComponentType, FunctionComponent } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';

const DEFAULT_PAGE_TITLE = 'The Moon';

interface AppProps {
  Component: ComponentType;
  pageProps: Record<string, string>;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const { title = DEFAULT_PAGE_TITLE } = pageProps;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
