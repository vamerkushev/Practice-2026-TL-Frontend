import styles from './CurrencyInformation.module.scss';
import ArrowTop from "../../images/ArrowTop.png";

type CurrencyInformationProps = {
    fromCurrencyCode: string;
    fromCurrencyTitle: string;
    fromCurrencySymbol: string;
    fromCurrencyDescription: string;
    toCurrencyCode: string;
    toCurrencyTitle: string;
    toCurrencySymbol: string;
    toCurrencyDescription: string;
};

export const CurrencyInformation = ({
    fromCurrencyCode,
    fromCurrencyTitle,
    fromCurrencySymbol,
    fromCurrencyDescription,
    toCurrencyCode,
    toCurrencyTitle,
    toCurrencySymbol,
    toCurrencyDescription
}: CurrencyInformationProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.button}>
                <span>{fromCurrencyCode}/{toCurrencyCode}: about </span> 
                <img className={styles.arrow} src={ArrowTop} alt='arrow-top'></img>
                <span className={styles.line}></span>
            </button>
            <div className={styles.block}>
                <h2 className={styles.title}>
                    {fromCurrencyTitle} - {fromCurrencyCode} - {fromCurrencySymbol}
                </h2>
                <p className={styles.text}>
                    {fromCurrencyDescription}
                </p>
            </div>
            <div className={styles.block}>
                <h2 className={styles.title}>
                    {toCurrencyTitle} - {toCurrencyCode} - {toCurrencySymbol}
                </h2>
                <p className={styles.text}>
                    {toCurrencyDescription}
                </p>
            </div>
        </div>
    );
};