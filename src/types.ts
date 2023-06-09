export type Player = {
  name: string;
  isWinner: boolean;
};

export type Game = {
  xPlayer: Player;
  oPlayer: Player;
  board: string[][];
  date?: number;
};
