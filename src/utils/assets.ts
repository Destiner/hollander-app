const USDC_TESTNET_ADDRESS = '0x302075a4F924Baa2F1cdAADedf42A62cc69F5205';
const DAI_TESTNET_ADDRESS = '0xd6e44BCb6902C66C16f388Cae6C48Dd65BBcdB53';
const WETH_TESTNET_ADDRESS = '0xeDf20323fd5Ee2d98EE74E87304644D439B8C367';
const UNI_TESTNET_ADDRESS = '0xD6F5dE9a631036215348a1EFcf88B3AD2b9D4Ecf';
const BAL_TESTNET_ADDRESS = '0x26C21Aa2d6cFc72Bc7Fa281A67A485ce5da17dd3';
const MKR_TESTNET_ADDRESS = '0xA3075ADaA905Ae900Cc43a111b1AdDb97Ad2b75c';

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const BAL_ADDRESS = '0xba100000625a3754423978a60c9317c58a424e3D';
const MKR_ADDRESS = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2';

function getAssets(): string[] {
  return [
    USDC_TESTNET_ADDRESS,
    DAI_TESTNET_ADDRESS,
    WETH_TESTNET_ADDRESS,
    UNI_TESTNET_ADDRESS,
    BAL_TESTNET_ADDRESS,
    MKR_TESTNET_ADDRESS,
  ];
}

function getDecimals(address: string): number {
  const map: Record<string, number> = {
    [USDC_TESTNET_ADDRESS]: 6,
    [DAI_TESTNET_ADDRESS]: 18,
    [WETH_TESTNET_ADDRESS]: 18,
    [UNI_TESTNET_ADDRESS]: 18,
    [BAL_TESTNET_ADDRESS]: 18,
    [MKR_TESTNET_ADDRESS]: 18,
  };
  return map[address];
}

function getIconUrl(testnetAddress: string): string {
  const addressMap: Record<string, string> = {
    [USDC_TESTNET_ADDRESS]: USDC_ADDRESS,
    [DAI_TESTNET_ADDRESS]: DAI_ADDRESS,
    [WETH_TESTNET_ADDRESS]: WETH_ADDRESS,
    [UNI_TESTNET_ADDRESS]: UNI_ADDRESS,
    [BAL_TESTNET_ADDRESS]: BAL_ADDRESS,
    [MKR_TESTNET_ADDRESS]: MKR_ADDRESS,
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
    [BAL_TESTNET_ADDRESS]: 'BAL',
    [MKR_TESTNET_ADDRESS]: 'MKR',
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
