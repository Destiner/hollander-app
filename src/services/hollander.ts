import { Contract } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/providers';
import { Coder } from 'abi-coder';

import EthereumService from './ethereum';

import auctionAbi from '@/abi/auction.json';
import factoryAbi from '@/abi/factory.json';

const FACTORY_ADDRESS = '0x613603a1158A7f31bb73309F89745cd096a3938f';

class HollanderService extends EthereumService {
  async createAuction(
    tokenBase: string,
    tokenQuote: string,
    amountBase: bigint,
    initialPrice: bigint,
    halvingPeriod: number,
    swapPeriod: number,
  ): Promise<string | null> {
    const signer = this.provider?.getSigner();
    if (!signer) {
      return null;
    }
    const contract = new Contract(FACTORY_ADDRESS, factoryAbi, signer);
    const tx: TransactionResponse = await contract.createAuction(
      tokenBase,
      tokenQuote,
      amountBase,
      initialPrice,
      halvingPeriod,
      swapPeriod,
    );
    const receipt = await tx.wait();
    const log = receipt.logs[0];
    const coder = new Coder(factoryAbi);
    const event = coder.decodeEvent(log.topics, log.data);
    if (event.name !== 'NewAuction') {
      return null;
    }
    return event.values.address as string;
  }

  async init(auction: string): Promise<void> {
    const signer = this.provider?.getSigner();
    if (!signer) {
      return;
    }
    const contract = new Contract(auction, auctionAbi, signer);
    const tx: TransactionResponse = await contract.init();
    await tx.wait();
  }

  async buy(auction: string, amountBuy: bigint): Promise<void> {
    const signer = this.provider?.getSigner();
    if (!signer) {
      return;
    }
    const contract = new Contract(auction, auctionAbi, signer);
    const tx: TransactionResponse = await contract.buy(amountBuy);
    await tx.wait();
  }

  async withdraw(auction: string, amount: bigint): Promise<void> {
    const signer = this.provider?.getSigner();
    if (!signer) {
      return;
    }
    const contract = new Contract(auction, auctionAbi, signer);
    const tx: TransactionResponse = await contract.withdraw(amount);
    await tx.wait();
  }
}

export default HollanderService;