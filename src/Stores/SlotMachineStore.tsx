import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { SlotMachineModel } from "../models/SlotMachineModel";
import uuid from "react-native-uuid";
import axios from "axios";
import { ResultRollModel } from "../models/ResultApiModel";

export class SlotMachineStore {
  slotMachineModel: SlotMachineModel = {
    credits: 1,
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
  gameOver: boolean = false;
  resultRollModel: ResultRollModel = {
    winnedCredits: 0,
    spin: [0, 0, 0],
  };

  doRoll = async () => {
    return await axios({
      method: "post",
      url: "http://localhost:2002/roll",
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const slotMachineStore = new SlotMachineStore();
export const SlotMachineContext = createContext(slotMachineStore);
export const SlotMachineProvider = SlotMachineContext.Provider;
export const useSlotMachineStoreStore = () => useContext(SlotMachineContext);
