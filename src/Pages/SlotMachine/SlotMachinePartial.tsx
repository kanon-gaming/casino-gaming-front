import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useSlotMachineStoreStore } from "../../Stores/SlotMachineStore";
import slotImage from "../../assets/img/slot/slotmachine.webp";

export const SlotMachinePartial = observer(() => {
  const slotMachineStore = useSlotMachineStoreStore();

  useEffect(() => {}, []);

  const roll = () => {
    if (!slotMachineStore.rolling) {
      slotMachineStore.rolling = true;

      let arm = document.getElementById("slot-arm");
      arm!.animate([{ top: "240px", height: "1%" }], {
        duration: 800,
        direction: "alternate",
        iterations: 2,
        endDelay: 500,
      });

      let knob = document.getElementById("slot-knob");
      knob!.animate([{ top: "-20px", height: "20px" }], {
        duration: 400,
        direction: "alternate",
        iterations: 2,
        endDelay: 500,
      });

      const elements = document.querySelectorAll(".fruits");

      elements.forEach((element) => {
        element.classList.add("rolling");
      });
    }
  };

  const stopRoll = () => {
    slotMachineStore.rolling = !slotMachineStore.rolling;

    const elements = document.querySelectorAll(".fruits");

    elements.forEach((element) => {
      if (slotMachineStore.rolling) {
        element.classList.add("rolling");
      } else {
        element.classList.remove("rolling");
      }
    });
  };

  const triggerSlotRotation = (slot: any) => {
    let options = slot.children;
    let randomOption = Math.floor(Math.random() * 8);
    let choosenOption = options[randomOption];
    slot.style.top = `${-choosenOption.offsetTop + 2}px`;
    return randomOption;
  };

  return (
    <div id="content" className="SlotMachine">
      <div id="slot-machine">
        <div id="slot-body">
          <div id="slot-block"></div>

          <div id="slot-frame"></div>

          <div id="slot-glaze-bottom"></div>

          <div id="slot-display">
            <div id="slot-overlay"></div>
            <div id="slot-overlay-line"></div>
            <div id="slot-credits">20</div>
            <div id="slot-zeros">00000000000</div>
          </div>

          <div id="slot-wheels">
            {slotMachineStore.slotMachineModel.rells.map((reel, i) => {
              return (
                <div className="wheel" id={"wheel" + (i + 1)} key={"rell_" + i}>
                  <div className="overlay"></div>
                  <div className="container" id={reel.id}>
                    {reel.fruits.map((fruit, j) => (
                      <div
                        className={"fruits rell_" + i}
                        key={"rell_" + i + "fruit_" + j}
                      >
                        {fruit}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div id="slot-trigger" onClick={roll}>
            <div id="slot-arm" className="arm">
              <div id="slot-knob" className="knob"></div>
            </div>
            <div className="arm-shadow"></div>
            <div className="ring1">
              <div className="shadow"></div>
            </div>
            <div className="ring2">
              <div className="shadow"></div>
            </div>
          </div>
        </div>

        <div id="slot-details">
          <div id="slot-top"></div>
          <div id="slot-bottom"></div>
        </div>
      </div>
    </div>
  );
});
