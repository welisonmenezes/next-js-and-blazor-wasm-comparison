import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button({
    label,
    href,
    modifier = "default",
    type = "link",
    ...props
}) {
    return (
        <>
            {type === "link" && (
                <Link href={href}>
                    <a
                        {...props}
                        className={`${styles.button} ${styles[modifier]}`}
                    >
                        {label}
                    </a>
                </Link>
            )}
            {type === "button" && (
                <button
                    {...props}
                    className={`${styles.button} ${styles[modifier]}`}
                >
                    {label}
                </button>
            )}
        </>
    );
}
