import { render, screen } from "@testing-library/react";

import { FilterButtons } from "./FilterButtons";

test('отображает кнопки фильтров', () => {
    render(
        <FilterButtons></FilterButtons>
    )

    expect(screen.getByText('+ SAVE FILTER')).toBeInTheDocument();
    expect(screen.getByText('CLEAR FILTERS')).toBeInTheDocument();
});