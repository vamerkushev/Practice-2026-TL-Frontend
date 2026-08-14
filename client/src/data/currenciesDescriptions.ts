export const currenciesDescriptions = (code: string): string => {
    switch(code){
        case 'PLN':
            return 'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.';
        case 'JPY':
            return 'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.';
        default:
            return 'No description.'
    }
};