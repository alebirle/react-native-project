import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { Cell } from '../components/Cell';

const Game = ({ navigation }) => {
  const appContext = useAppContext();
  const [player, setPlayer] = useState('X');
  const [gameWon, setGameWon] = useState(false);

  const commonProps = {
    player,
    setPlayer,
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
      <Text style={styles.text}>
        {appContext.currentGame.xPlayer.isWinner &&
        appContext.currentGame.oPlayer.isWinner
          ? 'Tie!'
          : appContext.currentGame.xPlayer.isWinner
          ? appContext.currentGame.xPlayer.name + ' won!'
          : appContext.currentGame.oPlayer.isWinner
          ? appContext.currentGame.oPlayer.name + ' won!'
          : null}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            appContext.handleRestart(
              appContext.currentGame.xPlayer.name,
              appContext.currentGame.oPlayer.name,
            );
            setGameWon(false);
          }}
        >
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            appContext.handleRestart('', '');
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Go home</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    padding: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'skyblue',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    color: 'violet',
    fontWeight: 'bold',
    fontSize: 20,
  },
  xo: {
    //position: 'absolute',
    //marginTop: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
  },
  actions: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
    //position: 'absolute',
    //marginTop: '35%',
  },
});
