import { render, screen } from "@testing-library/react";

import { HeaderCurrencyConverter } from "./HeaderCurrencyConverter";

test('отображает заголовок текущей валютной пары', () => {
    render(
        <HeaderCurrencyConverter
            fromAmountCurrency="1"
            fromNameCurrency="Polish zloty"
            toAmountCurrency="0.99"
            toNameCurrency="Japanese yen"
            date="Fri, 05 Apr 2026"
            time="10:35 UTC"
        />
    )
    
    expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
    expect(screen.getByText('0.99 Japanese yen')).toBeInTheDocument();
    expect(screen.getByText('Fri, 05 Apr 2026 10:35 UTC')).toBeInTheDocument();
});