import type { PriceChangeDto } from '../api/dto/priceChangeDto';
import type { PriceChanges } from '../types/priceChanges';

export const mapPriceChangeDtoToPriceChange = (dto: PriceChangeDto): PriceChanges => ({
  purchasedCurrencyCode: dto.purchasedCurrencyCode,
  paymentCurrencyCode: dto.paymentCurrencyCode,
  price: dto.price,
  dateTime: dto.dateTime
});
