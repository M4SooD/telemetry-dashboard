import { css } from '../../styled-system/css';
import { useMarketStore } from '../store/useMarketStore';

export const CoinWidget = ({ symbol }: { symbol: string }) => {
  const coin = useMarketStore((state) => state.assets[symbol]);

  if (!coin) {
    return null;
  }

  const isPositive = parseFloat(coin.priceChangePercent) >= 0;

  return (
    <div
      className={css({
        border: '1px solid #333',
        padding: '1rem',
        borderRadius: '8px',
        width: '300px',
        backgroundColor: '#1e1e1e',
        fontFamily: 'monospace',
      })}
    >
      <h2 className={css({ margin: 0, color: 'white' })}>{coin.symbol}</h2>

      <p
        className={css({
          fontSize: '1.5rem',
          margin: '0.5rem 0',
          color: 'white',
        })}
      >
        $
        {parseFloat(coin.lastPrice).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </p>

      <p
        className={css({
          margin: 0,
          color: isPositive ? '#00ff00' : '#ff0000',
        })}
      >
        {isPositive ? '+' : ''}
        {coin.priceChangePercent}%
      </p>
    </div>
  );
};
