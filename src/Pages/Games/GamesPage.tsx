import { gamesStore, GamesStoreProvider } from "../../Stores/GamesStore";

import logo from "../../assets/img/logo.webp";
import "../../assets/css/Games.css";
import { GamesPartial } from "./List/GamesPartial";

export function GamesPage() {
  return (
    <GamesStoreProvider value={gamesStore}>
      <div className="App">
        <div className="Header">
          <img src={logo} alt="Logo"/>
        </div>
        <GamesPartial />
      </div>
    </GamesStoreProvider>
  );
}
