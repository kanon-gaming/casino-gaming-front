import { gamesStore, GamesStoreProvider } from "../../Stores/GamesStore";

import "../../assets/css/Games.css";

import { GamesPartial } from "./List/GamesPartial";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BackGroundImg from "../../assets/img/games.webp";
import axios from "axios";

export function GamesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:2002/isAuthorized",
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    })
      .then((result) => {})
      .catch((result) => {
        navigate("/");
      });
  });

  return (
    <GamesStoreProvider value={gamesStore}>
      <div
        className="App"
        style={{
          backgroundImage: `url(${BackGroundImg})`,
          backgroundSize: "cover",
        }}
      >
        <GamesPartial />
      </div>
    </GamesStoreProvider>
  );
}
