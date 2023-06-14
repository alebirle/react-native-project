import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { Cell } from '../components/Cell';

const Game = ({ navigation }) => {
  const appContext = useAppContext();
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
      <Text style={styles.text}>
        {appContext.currentGame.xPlayer.name} {'(X) vs '}
        {appContext.currentGame.oPlayer.name} {'(O)'}
      </Text>
      <Text style={styles.text}>{gameWon ? 'Game over!' : null}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to home</Text>
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
  buttonText: {
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
  text: {
    marginTop: 50,
    textAlign: 'center',
    color: 'violet',
    fontWeight: 'bold',
    fontSize: 20,
  },
  xo: {
    marginTop: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
  },
});
