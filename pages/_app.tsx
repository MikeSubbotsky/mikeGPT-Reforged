import "@styles/global.css";
import { AppProps } from "next/app";
import Head from 'next/head';
import "tailwindcss/tailwind.css";
import '@fortawesome/fontawesome-svg-core/styles.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
        <title>MikeGPT</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
