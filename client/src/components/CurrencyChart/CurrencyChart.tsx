import styles from "./CurrencyChart.module.scss";
import chart from "../../images/Graf.png";

type CurrencyChartProps = {
    periods: number[];
    currentPeriod: number;
}

export const CurrencyChart = ({ periods, currentPeriod }: CurrencyChartProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.button}>
                {periods.map((period) => (
                    <button 
                        key={period} 
                        className={`${styles['default']} 
                        ${period === currentPeriod ? styles.active : styles.noactive}`}
                    >    
                        {period} MIN
                    </button>
                ))}
            </div>

            <img className={styles.chart} src={chart} alt="chart"></img>
        </div>
    )
}