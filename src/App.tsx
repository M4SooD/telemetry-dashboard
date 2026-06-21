import { useBinanceStream } from './hooks/useBinanceStream';
import { useMarketStore } from './hooks/useMarketStore';

export default function App() {
  useBinanceStream();

  const assetDictionary = useMarketStore((state) => state.assets);

  const assets = Object.values(assetDictionary);

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'monospace',
        color: 'white',
        backgroundColor: '#121212',
        minHeight: '100vh',
      }}
    >
      <h1>Live Market Telemetry</h1>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {assets.length === 0 ? (
          <p>Connecting to exchange...</p>
        ) : (
          assets.map((coin) => {
            const isPositive = parseFloat(coin.priceChangePercent) >= 0;
            const color = isPositive ? '#00ff00' : '#ff0000';

            return (
              <div
                key={coin.symbol}
                style={{
                  border: '1px solid #333',
                  padding: '1rem',
                  borderRadius: '8px',
                  width: '300px',
                  backgroundColor: '#1e1e1e',
                }}
              >
                <h2 style={{ margin: 0 }}>{coin.symbol}</h2>
                <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
                  $
                  {parseFloat(coin.lastPrice).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p style={{ color, margin: 0 }}>
                  {isPositive ? '+' : ''}
                  {coin.priceChangePercent}%
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
