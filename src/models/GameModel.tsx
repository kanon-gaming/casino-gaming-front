export type GameModel = {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  startUrl: string;
  thumb: GameThumbModel;
};

export type GameThumbModel = {
  url: string;
};
