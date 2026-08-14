import { render, screen } from "@testing-library/react";

import { CurrencyInformation } from "../CurrencyInformation/CurrencyInformation";
import { currenciesDescriptions } from "../../data/currenciesDescriptions";

test("отображает заголовки для переданных валют", () => {
    render(
        <CurrencyInformation
            fromCurrencyCode="PLN"
            fromCurrencyTitle="Polish zloty"
            fromCurrencySymbol="zł"
            fromCurrencyDescription={currenciesDescriptions("PLN")}
            toCurrencyCode="JPY"
            toCurrencyTitle="Japanese yen"
            toCurrencySymbol ="¥"
            toCurrencyDescription={currenciesDescriptions("JPY")}
        />
    );

    expect(screen.getByText("Polish zloty - PLN - zł")).toBeInTheDocument();
    expect(screen.getByText("Japanese yen - JPY - ¥")).toBeInTheDocument();
});

test("отображает соответствующие описания для переданных валют", () => {
    render(
        <CurrencyInformation
            fromCurrencyCode="PLN"
            fromCurrencyTitle="Polish zloty"
            fromCurrencySymbol="zł"
            fromCurrencyDescription={currenciesDescriptions("PLN")}
            toCurrencyCode="JPY"
            toCurrencyTitle="Japanese yen"
            toCurrencySymbol ="¥"
            toCurrencyDescription={currenciesDescriptions("JPY")}
        />
    );

    expect(screen.getByText(currenciesDescriptions('PLN'))).toBeInTheDocument();
    expect(screen.getByText(currenciesDescriptions('JPY'))).toBeInTheDocument();
});

test("отображает кнопку с соответсвтующей парой валют", () => {
    render(
        <CurrencyInformation
            fromCurrencyCode="PLN"
            fromCurrencyTitle="Polish zloty"
            fromCurrencySymbol="zł"
            fromCurrencyDescription={currenciesDescriptions("PLN")}
            toCurrencyCode="JPY"
            toCurrencyTitle="Japanese yen"
            toCurrencySymbol ="¥"
            toCurrencyDescription={currenciesDescriptions("JPY")}
        />
    );

    expect(screen.getByText('PLN/JPY: about')).toBeInTheDocument();
});

test("отображает отсутствие описания при передаче неизвестной валюты", () => {
    render(
        <CurrencyInformation
            fromCurrencyCode="PLN"
            fromCurrencyTitle="Polish zloty"
            fromCurrencySymbol="zł"
            fromCurrencyDescription={currenciesDescriptions("PLN")}
            toCurrencyCode="USD"
            toCurrencyTitle="American dollar"
            toCurrencySymbol ="$"
            toCurrencyDescription={currenciesDescriptions("USD")}
        />
    );

    expect(screen.getByText(currenciesDescriptions('PLN'))).toBeInTheDocument();
    expect(screen.getByText('No description.')).toBeInTheDocument();
});