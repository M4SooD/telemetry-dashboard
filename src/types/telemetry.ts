export interface BinanceTickerData {
  readonly symbol: string;
  readonly lastPrice: string;
  readonly priceChange: string;
  readonly priceChangePercent: string;
  readonly volume: string;
  readonly eventTime: number;
}
