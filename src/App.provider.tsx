import React from 'react';
import { Game } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppContextType = {
  currentGame: Game;
  pastGames: Game[];
  handlePlayerChosen: (player: string, name: string) => void;
  handleWinner: (winner: string) => void;
};

const defaultValue = {
  currentGame: {
    xPlayer: { name: '', isWinner: false },
    oPlayer: { name: '', isWinner: false },
  },
  pastGames: [],
  handlePlayerChosen: () => {},
  handleWinner: () => {},
};

type Props = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [currentGame, setCurrentGame] = React.useState<Game>({
    xPlayer: { name: '', isWinner: false },
    oPlayer: { name: '', isWinner: false },
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

  const handlePlayerChosen = React.useCallback(
    async (player: string, name: string) => {
      console.log((await getAppData())?.length);
      setCurrentGame((current) => ({
        ...current,
        [player]: { name: name, isWinner: false },
      }));
    },
    [],
  );

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

  const handleWinner = React.useCallback(
    (winner: string) => {
      var game: Game;

      if (winner === 'X') {
        game = {
          xPlayer: { name: currentGame.xPlayer.name, isWinner: true },
          oPlayer: currentGame.oPlayer,
          date: Date.now(),
        };
      } else if (winner === 'O') {
        game = {
          xPlayer: currentGame.xPlayer,
          oPlayer: { name: currentGame.oPlayer.name, isWinner: true },
          date: Date.now(),
        };
      } else {
        game = {
          xPlayer: { name: currentGame.xPlayer.name, isWinner: true },
          oPlayer: { name: currentGame.oPlayer.name, isWinner: true },
          date: Date.now(),
        };
      }

      setCurrentGame(game);
      const newGamesList = [...pastGames, game];
      setPastGames(newGamesList);
      setCurrentGame(defaultValue.currentGame);
      setAppData(newGamesList);
    },
    [currentGame, pastGames],
  );

  return (
    <AppContext.Provider
      value={{
        currentGame,
        pastGames,
        handlePlayerChosen,
        handleWinner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
