import { useCallback } from "react";
import Currency from "./Currency";

import styles from "./Currencies.module.scss";

export default function Currencies({ data }) {
    const getCurrencyByName = useCallback((data, name) => {
        return data.filter(
            (element) =>
                element.baseCurrency === name && element.quoteCurrency === "BRZ"
        );
    }, []);

    const interestedCurrencies = ["USDC", "USDT", "BTC", "ETH", "SOL", "XLM"];

    const markers = interestedCurrencies.map((element) => {
        return getCurrencyByName(data, element)[0];
    });

    markers.unshift({
        ticker: "BRZ",
        quoteCurrency: "BRZ",
        baseCurrency: "BRZ",
        price: 1.0,
    });

    return (
        <>
            {markers && markers.length > 0 && (
                <ul className={styles.container}>
                    {markers.map((element) => {
                        return (
                            <Currency
                                key={element.ticker}
                                src={`/icons/${element?.baseCurrency?.toLowerCase()}.svg`}
                                name={element.baseCurrency}
                                price={element.price?.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            />
                        );
                    })}
                </ul>
            )}
            {!markers || (markers.length <= 0 && <p>No data found.</p>)}
        </>
    );
}
