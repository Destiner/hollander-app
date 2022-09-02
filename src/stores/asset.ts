import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAssetStore = defineStore('asset', () => {
  const allowances = ref<
    Record<string, Record<string, Record<string, bigint>>>
  >({});
  const balances = ref<Record<string, Record<string, bigint>>>({});

  function setAllowance(
    asset: string,
    owner: string,
    spender: string,
    value: bigint,
  ): void {
    if (!allowances.value[asset]) {
      allowances.value[asset] = {};
    }
    if (!allowances.value[asset][owner]) {
      allowances.value[asset][owner] = {};
    }
    allowances.value[asset][owner][spender] = value;
  }

  function setBalance(asset: string, owner: string, value: bigint): void {
    if (!balances.value[asset]) {
      balances.value[asset] = {};
    }
    balances.value[asset][owner] = value;
  }

  function getAllowance(asset: string, owner: string, spender: string): bigint {
    if (!allowances.value[asset]) {
      return 0n;
    }
    if (!allowances.value[asset][owner]) {
      return 0n;
    }
    if (!allowances.value[asset][owner][spender]) {
      return 0n;
    }
    return allowances.value[asset][owner][spender];
  }

  function getBalance(asset: string, owner: string): bigint {
    if (!balances.value[asset]) {
      return 0n;
    }
    if (!balances.value[asset][owner]) {
      return 0n;
    }
    return balances.value[asset][owner];
  }

  return {
    allowances,
    balances,
    setAllowance,
    setBalance,
    getAllowance,
    getBalance,
  };
});

export default useAssetStore;
