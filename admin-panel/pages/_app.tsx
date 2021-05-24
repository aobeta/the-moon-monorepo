import Layout from '../components/layout/layout';
import Head from 'next/head';
import '../styles/globals.css';

const DEFAULT_PAGE_TITLE = 'The Moon Admin';

function MyApp({ Component: PageComponent, pageProps }) {
  const { title = DEFAULT_PAGE_TITLE } = pageProps;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <PageComponent {...pageProps} />
    </Layout>
  )
}

export default MyApp
