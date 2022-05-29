import "antd/dist/antd.css";
import Header from "../components/header";
import Footer from "../components/footer";
import "./font.css";
import "../public/styles.css";

import * as gtag from '../lib/gtag';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Head>
        <link type="text/css" rel="stylesheet" href="/styles.css" as="style"></link>

        <title>Project MED</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
