import styles from "./MenuButton.module.scss";

export default function MenuButton({ modifier = "default", ...props }) {
    return (
        <span
            className={`${styles.button} ${styles[modifier]}`}
            {...props}
        ></span>
    );
}
