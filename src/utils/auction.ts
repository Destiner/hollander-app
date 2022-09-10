import { auctionPriceFromWei } from './formatters';

type AuctionStatus = 'draft' | 'active' | 'complete';

interface Auction {
  owner: string;
  address: string;
  assetIn: string;
  assetOut: string;
  amountIn: bigint;
  amountOut: bigint;
  amountOutTotal: bigint;
  initialPrice: bigint;
  price: bigint;
  halvingPeriod: number;
  swapPeriod: number;
  blockStart: number;
}

function getStatus(blockStart: number, amountOut: bigint): AuctionStatus {
  if (blockStart === 0) {
    return 'draft';
  }
  if (amountOut === 0n) {
    return 'complete';
  }
  return 'active';
}

function getHistoricalPrice(auction: Auction): Record<number, number> {
  const startTime = Date.now() + 0;
  const endTime = startTime + 16 * 60 * 60 * 1000;
  const step = 10 * 60 * 1000;
  const prices: Record<number, number> = {};
  for (let time = startTime; time < endTime; time += step) {
    const price = getPrice(auction, time - startTime);
    prices[time] = price;
  }
  return prices;
}

function getPrice(auction: Auction, timestamp: number): number {
  const boughtAmount = 0;
  const blockTime = 14 * 1000;
  const swapPeriod = auction.swapPeriod * blockTime;
  const halvingPeriod = auction.halvingPeriod * blockTime;
  const exponent =
    (timestamp -
      (boughtAmount / parseInt(auction.amountOutTotal.toString())) *
        swapPeriod) /
    halvingPeriod;
  const priceWei = (
    parseInt(auction.initialPrice.toString()) /
    2 ** exponent
  ).toFixed(0);
  const priceWeiNumber = BigInt(
    parseFloat(priceWei).toLocaleString('fullwide', { useGrouping: false }),
  );
  return auctionPriceFromWei(auction.assetOut, auction.assetIn, priceWeiNumber);
}

export { Auction, AuctionStatus, getStatus, getHistoricalPrice };
