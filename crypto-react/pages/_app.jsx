import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/layouts/Layout";
import { AppContextProvider } from "../contexts/AppContext";

import "../styles/globals.scss";
import content from "./index.json";

function MyApp({ Component, pageProps }) {
    const { locale } = useRouter();
    const [loading, setLoading] = useState(false);

    Router.onRouteChangeStart = () => {
        setLoading(true);
    };

    Router.onRouteChangeComplete = () => {
        setLoading(false);
    };

    return (
        <AppContextProvider>
            <Head>
                <title>{content[locale].pageTitle}</title>
                <meta name="description" content={content[locale].pageDesc} />
            </Head>
            <Layout loading={loading}>
                <Component {...pageProps} />
            </Layout>
        </AppContextProvider>
    );
}

export default MyApp;
