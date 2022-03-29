import Image from "next/image";
import styles from "./Currency.module.scss";

export default function Currency({ src, name, price }) {
    return (
        <li className={styles.container}>
            <figure className={styles.figure}>
                <Image src={src} alt={name} width={48} height={48} />
                <span>{name}</span>
            </figure>
            <span>{price}</span>
        </li>
    );
}
