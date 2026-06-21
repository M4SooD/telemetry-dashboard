import { create } from 'zustand';
import type { BinanceTickerData } from '../types/telemetry';

interface MarketStore {
  assets: Record<string, BinanceTickerData>;
  updateAsset: (data: BinanceTickerData) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  assets: {},

  updateAsset: (data) =>
    set((state) => ({
      assets: {
        ...state.assets,
        [data.symbol]: data,
      },
    })),
}));
