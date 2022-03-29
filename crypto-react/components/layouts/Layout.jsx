import Head from "next/head";
import { useEffect, useCallback } from "react";
import { toggleScroll } from "../../contexts/AppActions";
import { useAppContext } from "../../contexts/AppContext";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Menu from "../shared/Menu";
import Spinner from "../ui/Spinner";

import styles from "./Layout.module.scss";

export default function Layout({ children, loading }) {
    const { appContext, dispatch } = useAppContext();

    const handleScroll = useCallback(() => {
        const diff = 50;
        if (window.scrollY > diff && !appContext.isScrolled) {
            dispatch(toggleScroll(true));
        } else if (window.scrollY <= diff && appContext.isScrolled) {
            dispatch(toggleScroll(false));
        }
    }, [appContext.isScrolled, dispatch]);

    const isScrolledCssClass = useCallback(() => {
        return appContext.isScrolled ? "is-scrolled" : "is-not-scrolled";
    }, [appContext.isScrolled]);

    useEffect(() => {
        document.documentElement.lang = "en-us";
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <>
            <Head>
                <link href="/favicon.png" rel="icon" />
            </Head>
            <div
                className={`${styles.container} ${
                    styles[isScrolledCssClass()]
                }`}
            >
                <Header />
                <Menu />
                <main>
                    <div className={styles.wrap}>
                        {loading && <Spinner />}
                        {!loading && (
                            <>
                                <div>{children}</div>
                            </>
                        )}
                        <Footer />
                    </div>
                </main>
            </div>
            <div className={styles.footerDetail}></div>
        </>
    );
}
