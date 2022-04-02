import styles from "./Error.module.scss";

export default function Error({ message }) {
    return <p className={styles.container}>{message}</p>;
}
