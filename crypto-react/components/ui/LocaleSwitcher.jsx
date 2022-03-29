import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

import styles from "./LocaleSwitcher.module.scss";

export default function LocaleSwitcher() {
    const { locales, locale, pathname, query, asPath } = useRouter();
    const otherLocales = locales.filter((l) => l !== locale);
    const [isOpen, setIsOpen] = useState(false);

    const isOpenCssClass = useCallback(() => {
        return isOpen ? "open" : "closed";
    }, [isOpen]);

    const closeSwitcher = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        document.body.addEventListener("click", closeSwitcher);

        return function cleanup() {
            document.body.removeEventListener("click", closeSwitcher);
        };
    }, [closeSwitcher]);

    return (
        <div className={`${styles.container} ${styles[isOpenCssClass()]}`}>
            <div
                className={styles.selected}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                <span className={styles.element}>
                    <Image
                        src={`/icons/flag-${locale}.svg`}
                        width="19"
                        height="24"
                        alt={locale}
                    />
                    {locale}
                </span>
            </div>
            <ul className={`${styles.list} ${styles[isOpenCssClass()]}`}>
                {otherLocales.map((locale) => {
                    return (
                        <li key={locale} className={styles.item}>
                            <Link
                                href={{ pathname, query }}
                                as={asPath}
                                locale={locale}
                            >
                                <a className={styles.element}>
                                    <Image
                                        src={`/icons/flag-${locale}.svg`}
                                        width="19"
                                        height="24"
                                        alt={locale}
                                    />
                                    {locale}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
