import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';

export const Cell = (props) => {
  const appContext = useAppContext();
  const [state, setState] = useState('');
  const { player, setPlayer, board, setBoard, gameWon, setGameWon, row, col } =
    props;
  const [style, setStyle] = useState(styles.button);

  const addText = () => {
    if (state.length === 0) {
      const updatedStyle = {
        ...style,
        color: player === 'X' ? 'purple' : 'navy',
      };

      const newBoard = [...board];
      newBoard[row][col] = player;
      setBoard(newBoard);

      if (checkForWinner()) {
        setGameWon(true);
        appContext.handleWinner(player);
      }

      setState(player);
      setStyle(updatedStyle);
      setPlayer((prevPlayer) => {
        return prevPlayer === 'X' ? 'O' : 'X';
      });
    }
  };

  const checkForWinner = () => {
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

    return true;
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={addText} disabled={gameWon}>
        <Text style={style}>{state}</Text>
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
