import Currencies from "../components/ui/currencies/Currencies";
import Introduction from "../components/ui/Introduction";

import styles from "./index.module.scss";
import content from "./index.json";

export default function Home({ data, error }) {
    return (
        <>
            <div className={styles.container}>
                <Introduction />
                <Currencies data={data} error={error} />
            </div>
        </>
    );
}

export async function getStaticProps({ locale }) {
    try {
        const response = await fetch(
            `https://crypto.transfero.com/api/v1/markets`
        );
        const data = await response.json();
        return { props: { data, error: null }, revalidate: 10 };
    } catch (error) {
        return {
            props: { data: null, error: content[locale].notFound },
            revalidate: 10,
        };
    }
}
