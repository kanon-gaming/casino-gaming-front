import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { GameModel } from "../models/GameModel";

export class GamesStore {
  gamesModel: GameModel[] = [];
  search: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}

export const gamesStore = new GamesStore();
export const GamesStoreContext = createContext(gamesStore);
export const GamesStoreProvider = GamesStoreContext.Provider;
export const useGamesStore = () => useContext(GamesStoreContext);
