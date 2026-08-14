import { render, screen } from "@testing-library/react";

import { CurrencyChart } from "./CurrencyChart";
import { chartPeriods } from "../../data/chartPeriods";

test('отображает кнопки всех периодов', () => {
    render(
        <CurrencyChart
            periods={chartPeriods}
            currentPeriod={4}
        />
    );

    chartPeriods.forEach((period) => {
        expect(screen.getByText(`${period} MIN`)).toBeInTheDocument();
    });
});

test('отображает график', () => {
    render(
        <CurrencyChart
            periods={chartPeriods}
            currentPeriod={4}
        />
    );

    const imageChart = screen.getByAltText("chart");
    expect(imageChart).toBeInTheDocument();
});