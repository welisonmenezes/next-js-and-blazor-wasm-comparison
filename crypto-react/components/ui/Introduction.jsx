import { useRouter } from "next/router";
import Button from "./Button";

import styles from "./Introduction.module.scss";
import content from "./Introduction.json";

export default function Introduction() {
    const { locale } = useRouter();

    return (
        <div className={styles.container}>
            <h1>{content[locale].title}</h1>
            <p>{content[locale].description}</p>
            <Button label={content[locale].label} href="/dashboard" />
        </div>
    );
}
