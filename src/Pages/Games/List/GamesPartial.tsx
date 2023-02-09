import React, { useEffect } from "react";
import { useGamesStore } from "../../../Stores/GamesStore";
import data from "../../../Infrastructure/Data/game-data.json";
import { observer } from "mobx-react";
import { Form } from "react-bootstrap";
import logo from "../../../assets/img/logo.webp";

export const GamesPartial = observer(() => {
  const gameStore = useGamesStore();

  useEffect(() => {
    if (gameStore.search) {
      gameStore.gamesModel = [];

      data
        .filter((game) => {
          if (game.title.toLowerCase().includes(gameStore.search.toLowerCase()))
            return game;
        })
        .map((game) => {
          gameStore.gamesModel.push({
            id: game.id,
            providerName: game.providerName,
            slug: game.slug,
            startUrl: game.startUrl ?? "",
            thumb: {
              url: game.thumb?.url ?? "",
            },
            title: game.title,
          });
          return game;
        });
    } else {
      gameStore.gamesModel = [];
      data.map((game) => {
        gameStore.gamesModel.push({
          id: game.id,
          providerName: game.providerName,
          slug: game.slug,
          startUrl: game.startUrl ?? "",
          thumb: {
            url: game.thumb?.url ?? "",
          },
          title: game.title,
        });
        return game;
      });
    }
  }, [gameStore, gameStore.search]);

  return (
    <div>
      <div className="Header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="GamesContainer">
        <div>
          <div className="SearchInput">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => (gameStore.search = e.currentTarget.value)}
                type="text"
                placeholder="Search"
              />
            </Form.Group>
          </div>
          <div className="GamesArea">
            {gameStore.gamesModel.map((item) => {
              return (
                <div key={item.id} className={item.startUrl != null && item.startUrl !== "" ? "GameEnabled" : "GameDisabled"}>
                  {item.startUrl != null && item.startUrl !== "" ? (
                    <a rel="noreferrer" target="_blank" href={item.startUrl}>
                      <img alt={item.title} src={item.thumb?.url} />
                    </a>
                  ) : (
                    <img alt={item.title} src={item.thumb?.url} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
