import React, { useState } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Cell = (props) => {
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
      setGameWon(checkForWinner());

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

const Game = ({ navigation }) => {
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [gameWon, setGameWon] = useState(false);

  const commonProps = {
    player,
    setPlayer,
    board,
    setBoard,
    gameWon,
    setGameWon,
  };

  const cellPositions = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ];

  return (
    <View>
      <Text style={styles.gameOver}>{gameWon ? 'Game over!' : null}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Back to home</Text>
      </TouchableOpacity>
      <View style={styles.xo}>
        {cellPositions.map((position, index) => (
          <Cell key={index} {...commonProps} {...position} />
        ))}
      </View>
    </View>
  );
};
export default Game;

const styles = StyleSheet.create({
  text: {
    padding: 5,
    marginTop: 10,
    width: 100,
    height: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'skyblue',
  },
  gameOver: {
    marginTop: 50,
    textAlign: 'center',
    color: 'violet',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    fontSize: 50,
    textAlign: 'center',
  },
  xo: {
    marginTop: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
  },
});
