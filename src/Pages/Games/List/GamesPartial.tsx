import React, { useEffect } from "react";
import { useGamesStore } from "../../../Stores/GamesStore";
import data from "../../../Infrastructure/Data/game-data.json";
import { observer } from "mobx-react";
import { Form } from "react-bootstrap";

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
      if (gameStore.gamesModel.length === 0) {
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
    }
  }, [gameStore.gamesModel, gameStore.search]);

  return (
    <div className="GamesContainer">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={(e) => (gameStore.search = e.currentTarget.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <div className="GamesArea">
        {gameStore.gamesModel.map((item) => {
          return (
            <div key={item.id}>
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
  );
});
