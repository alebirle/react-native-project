import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';

export const Cell = (props) => {
  const appContext = useAppContext();
  const { player, setPlayer, gameWon, setGameWon, row, col } = props;
  const [style, setStyle] = useState(styles.button);

  const addText = () => {
    if (appContext.currentGame.board[row][col].length === 0) {
      const updatedStyle = {
        ...style,
        color: player === 'X' ? 'purple' : 'navy',
      };

      appContext.handleMove(row, col, player);

      const hasWinner = checkForWinner();
      if (hasWinner) {
        setGameWon(true);
        appContext.handleWinner(player);
      } else if (hasWinner == null) {
        setGameWon(true);
        appContext.handleWinner('');
      }

      setStyle(updatedStyle);
      setPlayer((prevPlayer) => {
        return prevPlayer === 'X' ? 'O' : 'X';
      });
    }
  };

  const checkForWinner = (): boolean | null => {
    const board = appContext.currentGame.board;

    if (
      board[1][1].length > 0 &&
      ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[2][0] === board[1][1] && board[1][1] === board[0][2]))
    ) {
      return true;
    }

    for (var i = 0; i < 3; i++) {
      if (
        board[i][0].length > 0 &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return true;
      }

      if (
        board[0][i].length > 0 &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return true;
      }
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j].length === 0) {
          return false;
        }
      }
    }

    return null;
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={addText} disabled={gameWon}>
        <Text style={style}>{appContext.currentGame.board[row][col]}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    fontSize: 50,
    textAlign: 'center',
  },
});
