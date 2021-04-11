import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.scss';

const DEFAULT_PAGE_TITLE = 'The Moon';

function MyApp({ Component, pageProps }) {
  let { title = DEFAULT_PAGE_TITLE } = pageProps;

  return (
    <Layout>
      <Head>
          <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
