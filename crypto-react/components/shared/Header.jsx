import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { openMenuAction } from "../../contexts/AppActions";
import { useAppContext } from "../../contexts/AppContext";
import MenuButton from "../ui/MenuButton";
import styles from "./Header.module.scss";
import LocaleSwitcher from "../ui/LocaleSwitcher";

export default function Header() {
    const { dispatch } = useAppContext();

    const handleOnClick = useCallback(() => {
        dispatch(openMenuAction());
    }, [dispatch]);

    return (
        <header className={styles.container}>
            <div className="nice-transition-all">
                <div className={styles.wrap}>
                    <Link href="/">
                        <a>
                            <Image
                                src="/logo.svg"
                                alt="Transfero Logo"
                                width={250}
                                height={55}
                            />
                        </a>
                    </Link>
                    <div className={styles.actions}>
                        <LocaleSwitcher />
                        <MenuButton onClick={handleOnClick} />
                    </div>
                </div>
            </div>
        </header>
    );
}
