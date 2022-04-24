import "antd/dist/antd.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import "./font.css";
import "../public/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>

        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-9W9WPPYMEF');`}} />


        <link type="text/css" rel="stylesheet" href="/styles.css" as="style"></link>

        <title>Project MED</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />

      </Head>

      <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-9W9WPPYMEF" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`}} />

      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
