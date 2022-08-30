import { formatUnits, parseUnits } from '@ethersproject/units';

const USDC_TESTNET_ADDRESS = '0xa';
const DAI_TESTNET_ADDRESS = '0xb';
const WETH_TESTNET_ADDRESS = '0xc';
const UNI_TESTNET_ADDRESS = '0xd';

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

function getDecimals(address: string): number {
  const map: Record<string, number> = {
    [USDC_TESTNET_ADDRESS]: 6,
    [DAI_TESTNET_ADDRESS]: 18,
    [WETH_TESTNET_ADDRESS]: 18,
    [UNI_TESTNET_ADDRESS]: 18,
  };
  return map[address];
}

export { formatAddress, fromWei, toWei };
