import { gamesStore, GamesStoreProvider } from "../../Stores/GamesStore";

import "../../assets/css/Games.css";
import { GamesPartial } from "./List/GamesPartial";

import BackGroundImg from "../../assets/img/games.webp";

export function GamesPage() {
  return (
    <GamesStoreProvider value={gamesStore}>
      <div
        className="App"
        style={{
          backgroundImage: `url(${BackGroundImg})`,
          backgroundSize: "cover"
        }}
      >
        <GamesPartial />
      </div>
    </GamesStoreProvider>
  );
}
