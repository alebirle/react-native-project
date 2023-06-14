import React from 'react';
import { Game } from './types';

type AppContextType = {
  currentGame: Game;
  handlePlayerChosen: (player: string, name: string) => void;
  handleNewGame: (game: Game) => void;
  handleWinner: (winner: string) => void;
};

const defaultValue = {
  currentGame: {
    xPlayer: { name: '', isWinner: false },
    oPlayer: { name: '', isWinner: false },
  },
  handleNewGame: () => {},
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

  const handleNewGame = React.useCallback((game: Game) => {
    setCurrentGame(game);
  }, []);

  const handlePlayerChosen = React.useCallback(
    (player: string, name: string) => {
      setCurrentGame({
        ...currentGame,
        [player]: { name: name, isWinner: false },
      });
    },
    [currentGame],
  );

  const handleWinner = React.useCallback(
    (winner: string) => {
      if (winner === 'X') {
        setCurrentGame({
          ...currentGame,
          ['xPlayer']: { name: currentGame.xPlayer.name, isWinner: true },
        });
      } else {
        setCurrentGame({
          ...currentGame,
          ['oPlayer']: { name: currentGame.oPlayer.name, isWinner: true },
        });
      }
    },
    [currentGame],
  );

  return (
    <AppContext.Provider
      value={{
        currentGame,
        handleNewGame,
        handlePlayerChosen,
        handleWinner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
