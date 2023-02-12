import React from "react";
import { SlotMachinePartial } from "./SlotMachinePartial";
import { SlotMachineProvider, slotMachineStore } from "../../Stores/SlotMachineStore";
import "../../assets/css/SlotMachine.css";

export function SlotMachinePage() {
  return (
    <SlotMachineProvider value={slotMachineStore}>
      <SlotMachinePartial />
    </SlotMachineProvider>
  );
}
