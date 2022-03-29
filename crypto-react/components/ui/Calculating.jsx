import React, { useEffect } from "react";

import styles from "./Calculating.module.scss";

export default function Calculating() {
    useEffect(() => {
        console.time("concatenation");

        return () => {
            console.timeEnd("concatenation");
        };
    }, []);

    return <div className={styles.container}>Calculating...</div>;
}
