import Image from "next/image";
import styles from "./Spinner.module.scss";

export default function Spinner({ modifier = "default", ...props }) {
    return (
        <div className={styles.container}>
            <Image src="/spinner.svg" alt="loading..." width={50} height={50} />
        </div>
    );
}
