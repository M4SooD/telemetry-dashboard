import { useBinanceStream } from './hooks/useBinanceStream';
import { CoinWidget } from './features/CoinWidget';
import { css } from '../styled-system/css';

const TRACKED_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT'];

export default function App() {
  console.log('[App] Rendered. This should only happen ONCE.');

  useBinanceStream();

  return (
    <div
      className={css({
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: '#121212',
      })}
    >
      <h1 className={css({ color: 'white', fontFamily: 'monospace' })}>
        Live Market Telemetry
      </h1>

      <div className={css({ display: 'grid', gap: '1rem', marginTop: '2rem' })}>
        {TRACKED_SYMBOLS.map((symbol) => (
          <CoinWidget key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}
