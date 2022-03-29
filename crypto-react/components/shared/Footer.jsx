import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Footer.module.scss";
import content from "./Footer.json";

export default function Footer() {
    const { locale } = useRouter();

    return (
        <footer className={styles.container}>
            <ul className={styles.menu}>
                <li>
                    <Link href="/">
                        <a>{content[locale].limits}</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a>{content[locale].taxs}</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a>{content[locale].terms}</a>
                    </Link>
                </li>
            </ul>
            <p>Powered by Transfero</p>
        </footer>
    );
}
