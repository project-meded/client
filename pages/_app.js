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

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9W9WPPYMEF"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
         
          gtag('config', 'G-9W9WPPYMEF');
        </script>


        <link type="text/css" rel="stylesheet" href="/styles.css" as="style"></link>

        <title>Project MED</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />

      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
