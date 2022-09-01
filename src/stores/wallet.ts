import { defineStore } from 'pinia';

const useWalletStore = defineStore('wallet', {
  state: () => {
    return { address: '' };
  },
  actions: {
    disconnect(): void {
      this.address = '';
    },
  },
  getters: {
    isConnected(): boolean {
      return this.address !== '';
    },
  },
});

export default useWalletStore;
