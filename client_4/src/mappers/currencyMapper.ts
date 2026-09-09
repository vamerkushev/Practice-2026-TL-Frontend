import type { Currency } from '../types/currency';
import type { CurrencyDto } from '../api/dto/currencyDto';

export const mapCurrencyDtoToCurrency = (dto: CurrencyDto): Currency => ({
  code: dto.code,
  name: dto.name,
  description: dto.description,
  symbol: dto.symbol
});
