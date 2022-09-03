import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/providers';

import EthereumService from './ethereum';

import erc20Abi from '@/abi/erc20.json';

class Erc20Service extends EthereumService {
  async allowance(
    asset: string,
    owner: string,
    spender: string,
  ): Promise<bigint | null> {
    if (!this.provider) {
      return null;
    }
    const contract = new Contract(asset, erc20Abi, this.provider);
    return ((await contract.allowance(owner, spender)) as BigNumber).toBigInt();
  }

  async balanceOf(asset: string, owner: string): Promise<bigint | null> {
    if (!this.provider) {
      return null;
    }
    const contract = new Contract(asset, erc20Abi, this.provider);
    return ((await contract.balanceOf(owner)) as BigNumber).toBigInt();
  }

  async approve(asset: string, spender: string): Promise<void> {
    const signer = this.provider?.getSigner();
    if (!signer) {
      return;
    }
    const contract = new Contract(asset, erc20Abi, signer);
    const tx: TransactionResponse = await contract.approve(spender, MaxUint256);
    await tx.wait();
  }
}

export default Erc20Service;
