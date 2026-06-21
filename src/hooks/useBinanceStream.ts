import { useEffect, useRef } from 'react';
import type { BinanceTickerData } from '../types/telemetry';

export const useBinanceStream = (onTick: (data: BinanceTickerData) => void) => {
  const savedCallback = useRef(onTick);

  useEffect(() => {
    savedCallback.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const wsUrl =
      'wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/solusdt@ticker';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('[Binance WS] Pipeline established');
    };

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

          savedCallback.current(tickerData);
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
