import React, { useEffect } from "react";
import { gamesStore, GamesStoreProvider } from "../../Stores/GamesStore";
import data from "../../Infrastructure/Data/game-data.json";
import { Card } from "react-bootstrap";

import logo from "../../assets/img/logo.webp";
import "../../assets/css/Games.css";

export function GamesPage() {
  useEffect(() => {}, []);
  return (
    <GamesStoreProvider value={gamesStore}>
      <div className="App">
        <div className="Header">
          <img src={logo} alt="Logo"/>
        </div>
      </div>
    </GamesStoreProvider>
  );
}
