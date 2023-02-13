import React, { useEffect } from "react";

import { Button, Table } from "react-bootstrap";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useSlotMachineStoreStore } from "../../Stores/SlotMachineStore";

import axios from "axios";
import background from "../../assets/img/slot/background.jpg";

export const SlotMachinePartial = observer(() => {
  const slotMachineStore = useSlotMachineStoreStore();
  const navigate = useNavigate();
  let armAudio = new Audio("/arm.mp3");
  let rell1Audio = new Audio("/reel.mp3");
  let winAudio = new Audio("/win2.mp3");
  let gameOverAudio = new Audio("/gameover.mp3");

  useEffect(() => {
    armAudio.load();
    rell1Audio.load();
    winAudio.load();
    gameOverAudio.load();

    axios({
      method: "get",
      url: process.env.REACT_APP_URL_BASE + "isAuthorized",
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    })
      .then((result) => {})
      .catch((result) => {
        navigate("/");
      });
  });

  const resetWhells = () => {
    const wheel1 = document.getElementById("wheel1");

    wheel1?.children[1].animate([{ marginTop: `0px` }], {
      duration: 400,
      iterations: 1,
      direction: "normal",
      fill: "forwards",
    });

    const wheel2 = document.getElementById("wheel2");

    wheel2?.children[1].animate([{ marginTop: `0px` }], {
      duration: 400,
      iterations: 1,
      direction: "normal",
      fill: "forwards",
    });
    const wheel3 = document.getElementById("wheel3");

    wheel3?.children[1].animate([{ marginTop: `0px` }], {
      duration: 400,
      iterations: 1,
      direction: "normal",
      fill: "forwards",
    });
  };

  const startWhells = () => {
    armAudio.play();

    let arm = document.getElementById("slot-arm");
    arm!.animate([{ top: "240px", height: "1%" }], {
      duration: 500,
      direction: "alternate",
      iterations: 2,
    });

    let knob = document.getElementById("slot-knob");
    knob!.animate([{ top: "-10px", height: "30px" }], {
      duration: 500,
      direction: "alternate",
      iterations: 2,
    });

    let armShadow = document.getElementById("slot-arm-shadow");
    armShadow!.animate([{ top: "240px" }], {
      duration: 510,
      direction: "alternate",
      iterations: 2,
    });

    let ring2shadow = document.getElementById("ring2-shadow");
    ring2shadow!.animate([{ top: "50%", opacity: "1" }], {
      duration: 570,
      direction: "alternate",
      iterations: 2,
    });

    let ring1shadow = document.getElementById("ring1-shadow");
    ring1shadow!.animate([{ top: "50%", opacity: "1" }], {
      duration: 570,
      direction: "alternate",
      iterations: 2,
    });
  };

  const roll = () => {
    if (!slotMachineStore.rolling) {
      slotMachineStore.rolling = true;

      slotMachineStore.slotMachineModel.credits--;

      resetWhells();
      startWhells();

      const elements = document.querySelectorAll(".fruits");

      elements.forEach((element) => {
        element.classList.add("rolling");
      });

      slotMachineStore.doRoll().then((result) => {
        slotMachineStore.resultRollModel = result.data;
        setTimeout(() => {
          stopRoll();
        }, 2000);
      });
    }
  };

  const stopWhells = (slotHeight: number) => {
    //Stop Wheel 1
    setTimeout(() => {
      const wheel1 = document.getElementById("wheel1");
      wheel1!.querySelectorAll(".fruits")!.forEach((element) => {
        element.classList.remove("rolling");
      });

      wheel1?.children[1].animate(
        [
          {
            marginTop: `${
              -slotHeight * slotMachineStore.resultRollModel.spin[0]
            }px`,
          },
        ],
        {
          duration: 400,
          iterations: 1,
          direction: "normal",
          fill: "forwards",
        }
      );

      setTimeout(() => {
        rell1Audio.play();
      }, 380);
    }, 100);

    //Stop Wheel 2
    setTimeout(() => {
      const wheel2 = document.getElementById("wheel2");
      wheel2!.querySelectorAll(".fruits")!.forEach((element) => {
        element.classList.remove("rolling");
      });

      wheel2?.children[1].animate(
        [
          {
            marginTop: `${
              -slotHeight * slotMachineStore.resultRollModel.spin[1]
            }px`,
          },
        ],
        {
          duration: 400,
          iterations: 1,
          direction: "normal",
          fill: "forwards",
        }
      );

      setTimeout(() => {
        rell1Audio.play();
      }, 380);
    }, 800);

    //Stop Wheel 3
    setTimeout(() => {
      const wheel3 = document.getElementById("wheel3");
      wheel3!.querySelectorAll(".fruits")!.forEach((element) => {
        element.classList.remove("rolling");
      });

      wheel3?.children[1].animate(
        [
          {
            marginTop: `${
              -slotHeight * slotMachineStore.resultRollModel.spin[2]
            }px`,
          },
        ],
        {
          duration: 400,
          iterations: 1,
          direction: "normal",
          fill: "forwards",
        }
      );

      setTimeout(() => {
        rell1Audio.play();
      }, 380);
    }, 1500);
  };

  const stopRoll = () => {
    const height = window.innerHeight;
    const slotHeight = height * 0.5;

    stopWhells(slotHeight);

    setTimeout(() => {
      if (slotMachineStore.resultRollModel.winnedCredits > 0) {
        slotMachineStore.slotMachineModel.credits +=
          slotMachineStore.resultRollModel.winnedCredits;

        const coins = document.getElementById("slot-credits");

        coins?.animate(
          [
            {
              opacity: 0,
            },
          ],
          {
            duration: 180,
            iterations: 6,
            direction: "alternate",
          }
        );
        winAudio.play();
      }

      if (slotMachineStore.slotMachineModel.credits > 0) {
        slotMachineStore.rolling = false;
      } else {
        gameOverAudio.play();
        slotMachineStore.gameOver = true;
      }
    }, 2600);
  };

  const tryAgain = () => {
    slotMachineStore.gameOver = false;
    slotMachineStore.rolling = false;
    slotMachineStore.slotMachineModel.credits = 20;
  };

  return (
    <div
      id="content"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
      className="SlotMachine"
    >
      <div id="slot-machine">
        <div id="slot-body">
          <div id="slot-block"></div>

          <div id="slot-frame"></div>

          <div hidden={!slotMachineStore.gameOver} id="slot-game-over">
            <span>Game Over</span>
            <Button onClick={tryAgain} variant="primary" type="button">
              Try again...
            </Button>
          </div>

          <div id="slot-glaze-bottom"></div>

          <div id="slot-display">
            <div id="slot-overlay"></div>
            <div id="slot-overlay-line"></div>
            <div id="slot-credits">
              {slotMachineStore.slotMachineModel.credits}
            </div>
            <div id="slot-zeros">00000000</div>
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
            <div id="slot-arm-shadow" className="arm-shadow"></div>
            <div className="ring1">
              <div id="ring1-shadow" className="shadow"></div>
            </div>
            <div className="ring2">
              <div id="ring2-shadow" className="shadow"></div>
            </div>
          </div>
        </div>

        <div id="slot-details">
          <div id="slot-top"></div>
          <div id="slot-bottom"></div>
        </div>
      </div>
      <div id="legend">
        <Table bordered>
          <tbody>
            <tr>
              <td className="reward">
                <span>🍒</span>
                <span>🍒</span>
                <span>🍒</span>
                <span>= 50</span>
              </td>
              <td className="reward">
                <span>🍒</span>
                <span>🍒</span>
                <span>❓</span>
                <span>= 40</span>
              </td>
              <td className="reward">
                <span>🍎</span>
                <span>🍎</span>
                <span>🍎</span>
                <span>= 20</span>
              </td>
            </tr>
            <tr>
              <td className="reward">
                <span>🍌</span>
                <span>🍌</span>
                <span>🍌</span>
                <span>= 15</span>
              </td>
              <td className="reward">
                <span>🍎</span>
                <span>🍎</span>
                <span>❓</span>
                <span>= 10</span>
              </td>
              <td className="reward">
                <span>🍌</span>
                <span>🍌</span>
                <span>❓</span>
                <span>= 5</span>
              </td>
            </tr>
            <tr
              style={{
                border: "none",
              }}
            >
              <td
                className="reward"
                style={{
                  border: "none",
                  width: "154px",
                  padding: "0px",
                }}
              ></td>
              <td
                className="reward"
                style={{
                  border: "1px solid black",
                }}
              >
                <span>🍋</span>
                <span>🍋</span>
                <span>🍋</span>
                <span>= 3</span>
              </td>
              <td
                className="reward"
                style={{
                  border: "none",
                  width: "154px",
                  padding: "0px",
                }}
              ></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
});
