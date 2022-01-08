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
        <link type="text/css" rel="stylesheet" href="/styles.css" as="style"></link>

        <title>Project Med</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />

      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
