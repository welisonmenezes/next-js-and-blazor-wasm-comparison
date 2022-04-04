import { useCallback } from "react";
import { useRouter } from "next/router";
import Currency from "./Currency";

import styles from "./Currencies.module.scss";
import Error from "../Error";

export default function Currencies({ data, error }) {
    const { locale } = useRouter();

    const getCurrencyByName = useCallback((data, name) => {
        return data.filter(
            (element) =>
                element.baseCurrency === name && element.quoteCurrency === "BRZ"
        );
    }, []);

    const interestedCurrencies = ["USDC", "USDT", "BTC", "ETH", "SOL", "XLM"];

    let markets = [];

    if (!error) {
        markets = interestedCurrencies.map((element) => {
            return getCurrencyByName(data, element)[0];
        });

        markets.unshift({
            ticker: "BRZ",
            quoteCurrency: "BRZ",
            baseCurrency: "BRZ",
            price: 1.0,
        });
    }

    return (
        <>
            {error && <Error message={error} />}
            {(!error && !markets) ||
                (!error && markets.length <= 0 && (
                    <Error message="No data found." />
                ))}
            {!error && markets && markets.length > 0 && (
                <ul className={styles.container}>
                    {markets.map((element) => {
                        return (
                            <Currency
                                key={element.ticker}
                                src={`/icons/${element?.baseCurrency?.toLowerCase()}.svg`}
                                name={element.baseCurrency}
                                price={element.price?.toLocaleString(locale, {
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
