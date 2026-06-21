import { useEffect } from 'react';
import type { BinanceTickerData } from '../types/telemetry';
import { useMarketStore } from '../store/useMarketStore';

export const useBinanceStream = () => {
  useEffect(() => {
    const updateAsset = useMarketStore.getState().updateAsset;

    const streams =
      'btcusdt@ticker/ethusdt@ticker/solusdt@ticker/bnbusdt@ticker/xrpusdt@ticker';
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('[Binance WS] Connected to Global Store');

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed && parsed.data) {
          const raw = parsed.data;

          const tickerData: BinanceTickerData = {
            symbol: raw.s,
            lastPrice: raw.c,
            priceChange: raw.p,
            priceChangePercent: raw.P,
            volume: raw.v,
            eventTime: raw.E,
          };

          updateAsset(tickerData);
        }
      } catch (error) {
        console.error('[Binance WS] Parse error', error);
      }
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  });
};
