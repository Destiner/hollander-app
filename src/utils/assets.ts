const USDC_TESTNET_ADDRESS = '0xa';
const DAI_TESTNET_ADDRESS = '0xb';
const WETH_TESTNET_ADDRESS = '0xc';
const UNI_TESTNET_ADDRESS = '0xd';

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

function getAssets(): string[] {
  return [
    USDC_TESTNET_ADDRESS,
    DAI_TESTNET_ADDRESS,
    WETH_TESTNET_ADDRESS,
    UNI_TESTNET_ADDRESS,
  ];
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

function getIconUrl(testnetAddress: string): string {
  const addressMap: Record<string, string> = {
    [USDC_TESTNET_ADDRESS]: USDC_ADDRESS,
    [DAI_TESTNET_ADDRESS]: DAI_ADDRESS,
    [WETH_TESTNET_ADDRESS]: WETH_ADDRESS,
    [UNI_TESTNET_ADDRESS]: UNI_ADDRESS,
  };
  const address = addressMap[testnetAddress];
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
}

function getSymbol(testnetAddress: string): string {
  const map: Record<string, string> = {
    [USDC_TESTNET_ADDRESS]: 'USDC',
    [DAI_TESTNET_ADDRESS]: 'DAI',
    [WETH_TESTNET_ADDRESS]: 'WETH',
    [UNI_TESTNET_ADDRESS]: 'UNI',
  };
  return map[testnetAddress];
}

export {
  USDC_TESTNET_ADDRESS,
  WETH_TESTNET_ADDRESS,
  getAssets,
  getDecimals,
  getIconUrl,
  getSymbol,
};
