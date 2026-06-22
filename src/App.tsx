import { useBinanceStream } from './hooks/useBinanceStream';
import { CoinWidget } from './features/CoinWidget';
import { css } from '../styled-system/css';

const styles = {
  wrapper: css({
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#121212',
  }),
  header: css({
    color: 'white',
    fontFamily: 'monospace',
    marginBottom: '2rem',
  }),
  grid: css({
    display: 'grid',
    gap: '1rem',
  }),
};

const TRACKED_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT'];

export default function App() {
  console.log('[App] Rendered. This should only happen ONCE.');

  useBinanceStream();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Live Market Telemetry</h1>

      <div className={styles.grid}>
        {TRACKED_SYMBOLS.map((symbol) => (
          <CoinWidget key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}
