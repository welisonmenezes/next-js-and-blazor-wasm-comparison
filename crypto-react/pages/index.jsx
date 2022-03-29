import Currencies from "../components/ui/currencies/Currencies";
import Introduction from "../components/ui/Introduction";

import styles from "./index.module.scss";

export default function Home({ data }) {
    return (
        <>
            <div className={styles.container}>
                <Introduction />
                <Currencies data={data} />
            </div>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch(`https://crypto.transfero.com/api/v1/markets`);
    const data = await res.json();
    return { props: { data }, revalidate: 10 };
}
