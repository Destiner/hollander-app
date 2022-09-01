import { formatUnits, parseUnits } from '@ethersproject/units';

import { getDecimals } from './assets';

function toWei(address: string, amount: number): bigint {
  const decimals = getDecimals(address);
  return parseUnits(amount.toString(), decimals).toBigInt();
}

function fromWei(address: string, amount: bigint): number {
  const decimals = getDecimals(address);
  return parseFloat(formatUnits(amount, decimals));
}

function formatAddress(address: string): string {
  return `${address.substring(0, 8)}…${address.substring(36)}`;
}

function formatNumber(value: number): string {
  const valueFormat = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    currency: 'usd',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  return valueFormat.format(value);
}

function formatValue(value: number): string {
  const valueFormat = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  return valueFormat.format(value);
}

function formatShare(value: number): string {
  const valueFormat = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  return valueFormat.format(value);
}

export {
  formatAddress,
  formatNumber,
  formatValue,
  formatShare,
  fromWei,
  toWei,
};
