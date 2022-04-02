import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import Button from "../components/ui/Button";
import Row from "../components/ui/Row";

import styles from "./dashboard.module.scss";
import content from "./dashboard.json";

export default function Home() {
    const { locale } = useRouter();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const total = 100000;

    const getRows = useCallback(() => {
        console.time("Time of execution");
        var rows = [];
        for (var i = 0; i < total; i++) {
            rows.push(i + 1);
        }
        return rows;
    }, []);

    const handleOnClick = useCallback(() => {
        setLoading(true);
        setRows(getRows());
    }, [getRows]);

    const handleOnAfterRenderRow = () => {
        console.timeEnd("Time of execution");
    };

    useEffect(() => {
        if (rows.length === total) {
            setLoading(false);
        }
    }, [rows]);

    return (
        <>
            <Head>
                <title>{content[locale].pageTitle}</title>
                <meta name="description" content={content[locale].pageDesc} />
            </Head>
            <div className={styles.container}>
                <h1>{content[locale].title}</h1>
                {loading && <p>Calculating...</p>}
                {!loading && rows.length <= 0 && (
                    <Button
                        type="button"
                        label={content[locale].label}
                        onClick={handleOnClick}
                    />
                )}
                {!loading && rows.length > 0 && (
                    <div className={styles.result}>
                        {rows.map((row) => (
                            <Row
                                key={row}
                                index={row}
                                total={total}
                                onAfterRenderRow={handleOnAfterRenderRow}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
