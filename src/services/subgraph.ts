interface AuctionResponse {
  data: {
    auctions: {
      id: string;
      tokenBase: string;
      tokenQuote: string;
      amountBase: string;
      blockCreated: string;
      blockInit: string;
    }[];
  };
}

interface Auction {
  id: string;
  tokenBase: string;
  tokenQuote: string;
  amountBase: bigint;
  blockCreated: number;
  blockInit: number;
}

interface EventResponse {
  data: {
    inits: {
      id: string;
      timestamp: string;
      transactionHash: string;
    }[];
    swaps: {
      id: string;
      buyer: string;
      buyAmount: string;
      sellAmount: string;
      timestamp: string;
      transactionHash: string;
    }[];
    withdraws: {
      id: string;
      amount: string;
      timestamp: string;
      transactionHash: string;
    }[];
  };
}

interface InitEvent {
  id: string;
  timestamp: Date;
  transactionHash: string;
}

interface SwapEvent {
  id: string;
  buyer: string;
  buyAmount: bigint;
  sellAmount: bigint;
  timestamp: Date;
  transactionHash: string;
}

interface WithdrawEvent {
  id: string;
  amount: bigint;
  timestamp: Date;
  transactionHash: string;
}

type Event = InitEvent | SwapEvent | WithdrawEvent;

class SubgraphService {
  async getAuctions(): Promise<Auction[]> {
    const response = await fetch(
      'https://api.thegraph.com/subgraphs/name/destiner/hollander-goerli',
      {
        method: 'POST',
        body: JSON.stringify({
          query: `
          query {
            auctions(first: 20, orderBy: blockCreated, orderDirection: desc) {
              id
              tokenBase
              tokenQuote
              amountBase
              blockCreated
              blockInit
            }
          }
        `,
        }),
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    const json = (await response.json()) as AuctionResponse;
    return json.data.auctions.map((auction) => {
      return {
        id: auction.id,
        tokenBase: auction.tokenBase,
        tokenQuote: auction.tokenQuote,
        amountBase: BigInt(auction.amountBase),
        blockCreated: parseInt(auction.blockCreated),
        blockInit: parseInt(auction.blockInit),
      };
    });
  }

  async getEvents(address: string): Promise<Event[]> {
    const response = await fetch(
      'https://api.thegraph.com/subgraphs/name/destiner/hollander-goerli',
      {
        method: 'POST',
        body: JSON.stringify({
          query: `
          query {
            inits(where: { auction: "${address}" }) {
              id
              timestamp
              transactionHash
            }
            swaps(where: { auction: "${address}" }) {
              id
              timestamp
              buyer
              buyAmount
              sellAmount
              transactionHash
            }
            withdraws(where: { auction: "${address}" }) {
              id
              timestamp
              transactionHash
            }
          }
        `,
        }),
        headers: {
          'content-type': 'application/json',
        },
      },
    );

    const json = (await response.json()) as EventResponse;

    const initResponse = json.data.inits[0];
    const init: InitEvent = {
      id: initResponse.id,
      timestamp: new Date(parseInt(initResponse.timestamp) * 1000),
      transactionHash: initResponse.transactionHash,
    };

    const swaps: SwapEvent[] = json.data.swaps.map((swap) => {
      const { id, buyer, buyAmount, sellAmount, timestamp, transactionHash } =
        swap;
      return {
        id,
        buyer,
        buyAmount: BigInt(buyAmount),
        sellAmount: BigInt(sellAmount),
        timestamp: new Date(parseInt(timestamp) * 1000),
        transactionHash,
      };
    });

    const withdrawals: WithdrawEvent[] = json.data.withdraws.map((withdraw) => {
      const { id, amount, timestamp, transactionHash } = withdraw;
      return {
        id,
        amount: BigInt(amount),
        timestamp: new Date(parseInt(timestamp) * 1000),
        transactionHash,
      };
    });

    const events = [init, ...swaps, ...withdrawals];
    events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return events;
  }
}

export { Auction, Event };

export default SubgraphService;
