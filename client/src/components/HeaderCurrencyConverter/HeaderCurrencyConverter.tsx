import styles from "./HeaderCurrencyConverter.module.scss";

type HeaderCurrencyConverterProps = {
    fromAmountCurrency: string;
    fromNameCurrency: string;
    toAmountCurrency: string;
    toNameCurrency: string;
    date: string;
    time: string;
}

export const HeaderCurrencyConverter = ({
    fromAmountCurrency,
    fromNameCurrency,
    toAmountCurrency, 
    toNameCurrency,
    date,
    time,
}: HeaderCurrencyConverterProps) => {
    return(
        <div className={styles.header}>
            <p className={styles['from-converter-info']}>
                {fromAmountCurrency} {fromNameCurrency} is
            </p>
            <p className={styles['to-converter-info']}>
                {toAmountCurrency} {toNameCurrency}
            </p>
            < p className={styles.datetime}>
                {date} {time}
            </p>
        </div>
    );
};