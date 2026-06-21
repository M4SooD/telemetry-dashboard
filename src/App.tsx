import { useCallback } from 'react';
import type { BinanceTickerData } from './types/telemetry';
import { useBinanceStream } from './hooks/useBinanceStream';

export default function App() {
  console.log('[App] Component Rendered');
  const handleDataTick = useCallback((data: BinanceTickerData) => {
    if (data.symbol === 'BTCUSDT') {
      console.log(`[BTC] Price: $${data.lastPrice} | 24h Vol: ${data.volume}`);
    }
  }, []);

  useBinanceStream(handleDataTick);
  return (
    <div>
      <h1>Live Market Telemetry</h1>
      <p>System architecture initialized.</p>
    </div>
  );
}
