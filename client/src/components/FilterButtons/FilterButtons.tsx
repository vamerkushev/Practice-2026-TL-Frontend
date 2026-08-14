import styles from './FilterButtons.module.scss';

export const FilterButtons = () => {
    return(
        <div className={styles.container}>
            <button className={`${styles.default} ${styles.save}`}>+ SAVE FILTER</button>
            <button className={`${styles.default} ${styles.clear}`}>CLEAR FILTERS</button>
        </div>
    )
}