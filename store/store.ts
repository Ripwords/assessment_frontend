import { defineStore } from "pinia"

export const useStore = defineStore("store", {
  state: () => ({
    storeData: [],
    activeLocation: "",
    location: [3.1577, 101.7122] as [number, number],
  }),
})
