import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { SlotMachineModel } from "../models/SlotMachineModel";
import uuid from 'react-native-uuid';

export class SlotMachineStore {
  slotMachineModel: SlotMachineModel = {
    rells: [
      {
        id: uuid.v4().toString(),
        fruits: ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"],
      },
      {
        id: uuid.v4().toString(),
        fruits: ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"],
      },
      {
        id: uuid.v4().toString(),
        fruits: ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"],
      },
    ],
  };

  rolling: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const slotMachineStore = new SlotMachineStore();
export const SlotMachineContext = createContext(slotMachineStore);
export const SlotMachineProvider = SlotMachineContext.Provider;
export const useSlotMachineStoreStore = () => useContext(SlotMachineContext);
