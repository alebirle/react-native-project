import React from 'react';
import { Game } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppContextType = {
  currentGame: Game;
  pastGames: Game[];
  handlePlayerChosen: (player: string, name: string) => void;
  handleWinner: (winner: string) => void;
  handleMove: (row: number, col: number, val: string) => void;
  handleRestart: (xPlayerName: string, oPlayerName: string) => void;
};

const defaultValue = {
  currentGame: {
    xPlayer: { name: '', isWinner: false },
    oPlayer: { name: '', isWinner: false },
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  },
  pastGames: [],
  handlePlayerChosen: () => {},
  handleWinner: () => {},
  handleMove: () => {},
  handleRestart: () => {},
};

type Props = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [currentGame, setCurrentGame] = React.useState<Game>({
    xPlayer: { name: '', isWinner: false },
    oPlayer: { name: '', isWinner: false },
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  });
  const [pastGames, setPastGames] = React.useState<Game[]>([]);

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setPastGames(data);
      }
    };
    getDataFromStorage();
  }, []);

  const getAppData = async (): Promise<Game[] | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKey);

      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  };

  const setAppData = async (newData: Game[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch {}
  };

  const handlePlayerChosen = React.useCallback(
    (player: string, name: string) => {
      setCurrentGame((current) => ({
        ...current,
        [player]: { name: name, isWinner: false },
      }));
    },
    [],
  );

  const handleWinner = React.useCallback(
    (winner: string) => {
      var game: Game;

      if (winner === 'X') {
        game = {
          xPlayer: { name: currentGame.xPlayer.name, isWinner: true },
          oPlayer: currentGame.oPlayer,
          board: currentGame.board,
          date: Date.now(),
        };
      } else if (winner === 'O') {
        game = {
          xPlayer: currentGame.xPlayer,
          oPlayer: { name: currentGame.oPlayer.name, isWinner: true },
          board: currentGame.board,
          date: Date.now(),
        };
      } else {
        game = {
          xPlayer: { name: currentGame.xPlayer.name, isWinner: true },
          oPlayer: { name: currentGame.oPlayer.name, isWinner: true },
          board: currentGame.board,
          date: Date.now(),
        };
      }

      setCurrentGame(game);
      const newGamesList = [...pastGames, game];
      setPastGames(newGamesList);
      setAppData(newGamesList);
    },
    [currentGame, pastGames],
  );

  const handleMove = React.useCallback(
    (row: number, col: number, val: string) => {
      const newBoard = [...currentGame.board];
      newBoard[row][col] = val;
      setCurrentGame((current) => ({
        ...current,
        board: newBoard,
      }));
    },
    [currentGame.board],
  );

  const handleRestart = React.useCallback(
    (xPlayerName: string, oPlayerName: string) => {
      setCurrentGame({
        xPlayer: { name: xPlayerName, isWinner: false },
        oPlayer: { name: oPlayerName, isWinner: false },
        board: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      });
    },
    [],
  );

  return (
    <AppContext.Provider
      value={{
        currentGame,
        pastGames,
        handlePlayerChosen,
        handleWinner,
        handleMove,
        handleRestart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
