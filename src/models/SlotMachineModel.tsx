import internal from "stream";

export type SlotMachineModel = {
  credits: number;
  rells: RellModel[];
};

export type RellModel = {
  id: string;
  fruits: string[];
};
