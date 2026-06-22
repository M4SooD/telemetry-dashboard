import { css, cva } from '../../styled-system/css';
import { useMarketStore } from '../store/useMarketStore';

const styles = {
  container: css({
    border: '1px solid #333',
    padding: '1rem',
    borderRadius: '8px',
    width: '300px',
    backgroundColor: '#1e1e1e',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),
  title: css({
    margin: 0,
    color: 'white',
    fontWeight: 'bold',
  }),
  price: css({
    fontSize: '1.5rem',
    margin: 0,
    color: 'white',
  }),
};

const trendRecipe = cva({
  base: {
    margin: 0,
    fontWeight: 'bold',
  },
  variants: {
    trend: {
      up: { color: 'green.400' },
      down: { color: 'red.500' },
    },
  },
});

export const CoinWidget = ({ symbol }: { symbol: string }) => {
  const coin = useMarketStore((state) => state.assets[symbol]);

  if (!coin) {
    return null;
  }

  const isPositive = parseFloat(coin.priceChangePercent) >= 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{coin.symbol}</h2>

      <p className={styles.price}>
        $
        {parseFloat(coin.lastPrice).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </p>

      <p className={trendRecipe({ trend: isPositive ? 'up' : 'down' })}>
        {isPositive ? '+' : ''}
        {coin.priceChangePercent}%
      </p>
    </div>
  );
};
