import { useCallback } from "react";
import Link from "next/link";
import { closeMenuAction } from "../../contexts/AppActions";
import { useAppContext } from "../../contexts/AppContext";
import MenuButton from "../ui/MenuButton";

import styles from "./Menu.module.scss";

export default function Menu() {
    const { appContext, dispatch } = useAppContext();

    const handleOnClick = useCallback(() => {
        dispatch(closeMenuAction());
    }, [dispatch]);

    const menuCssClass = useCallback(() => {
        return appContext.isMenuOpen ? "menu-open" : "menu-closed";
    }, [appContext.isMenuOpen]);

    return (
        <>
            <aside
                className={`${styles.container} ${
                    styles[menuCssClass()]
                } nice-transition-all`}
            >
                <MenuButton onClick={handleOnClick} modifier="white" />
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <Link href="/">
                                <a onClick={handleOnClick}>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a onClick={handleOnClick}>FAQ</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a onClick={handleOnClick}>Login</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div
                className={`${styles.menuBG} ${styles[menuCssClass()]}`}
                onClick={handleOnClick}
            ></div>
        </>
    );
}
