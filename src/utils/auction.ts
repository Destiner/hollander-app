type AuctionStatus = 'draft' | 'active' | 'complete';

function getStatus(
  blockStart: number,
  amountOut: bigint,
  amountOutTotal: bigint,
): AuctionStatus {
  if (blockStart === 0) {
    return 'draft';
  }
  if (amountOut === amountOutTotal) {
    return 'complete';
  }
  return 'active';
}

export { AuctionStatus, getStatus };
