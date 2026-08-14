import { render, screen } from "@testing-library/react";

import { ListCurrencyPairs } from "./ListCurrencyPairs";
import { currencyPairs } from "../../data/currencyPairs";

test('отображает валютные пары', () => {
    render(
        <ListCurrencyPairs pairs={ currencyPairs } />
    )

    currencyPairs.forEach(({fromCurrency, toCurrency}) => {
        expect(screen.getByText(`${fromCurrency}/${toCurrency}`)).toBeInTheDocument();
    });
});