import { useCallback } from "react";
import Currency from "./Currency";

import styles from "./Currencies.module.scss";
import Error from "../Error";

export default function Currencies({ data, error }) {
    const getCurrencyByName = useCallback((data, name) => {
        return data.filter(
            (element) =>
                element.baseCurrency === name && element.quoteCurrency === "BRZ"
        );
    }, []);

    const interestedCurrencies = ["USDC", "USDT", "BTC", "ETH", "SOL", "XLM"];

    let markers = [];

    if (!error) {
        markers = interestedCurrencies.map((element) => {
            return getCurrencyByName(data, element)[0];
        });

        markers.unshift({
            ticker: "BRZ",
            quoteCurrency: "BRZ",
            baseCurrency: "BRZ",
            price: 1.0,
        });
    }

    return (
        <>
            {error && <Error message={error} />}
            {(!error && !markers) ||
                (!error && markers.length <= 0 && (
                    <Error message="No data found." />
                ))}
            {!error && markers && markers.length > 0 && (
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
        </>
    );
}
