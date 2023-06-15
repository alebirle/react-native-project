import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAppContext } from '../App.provider';

function Home({ navigation }) {
  const appContext = useAppContext();

  const startDisabled = React.useCallback((): boolean => {
    return (
      !appContext.currentGame.xPlayer.name ||
      !appContext.currentGame.oPlayer.name
    );
  }, [
    appContext.currentGame.oPlayer.name,
    appContext.currentGame.xPlayer.name,
  ]);

  return (
    <View>
      <Text style={styles.greeting}>Please type your names:</Text>
      <TextInput
        value={appContext.currentGame.xPlayer.name}
        style={styles.playerInput}
        placeholder="Player 1 (X)"
        placeholderTextColor={'gray'}
        onChangeText={(value) =>
          appContext.handlePlayerChosen('xPlayer', value)
        }
      />
      <TextInput
        value={appContext.currentGame.oPlayer.name}
        style={styles.playerInput}
        placeholder="Player 2 (O)"
        placeholderTextColor={'gray'}
        onChangeText={(value) =>
          appContext.handlePlayerChosen('oPlayer', value)
        }
      />
      <TouchableOpacity
        style={[
          styles.button,
          startDisabled() ? styles.disabled : styles.enabled,
        ]}
        onPress={() => navigation.navigate('Game')}
        disabled={startDisabled()}
      >
        <Text style={styles.text}>Start game</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    marginVertical: 3,
    alignSelf: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  greeting: {
    marginVertical: 30,
    textAlign: 'center',
    color: 'violet',
    fontWeight: 'bold',
    fontSize: 20,
  },
  playerInput: {
    borderColor: 'gray',
    height: 40,
    width: 200,
    borderWidth: 1,
    marginVertical: 3,
    alignSelf: 'center',
    borderRadius: 1,
    padding: 5,
  },
  disabled: {
    opacity: 0.7,
  },
  enabled: {
    opacity: 1,
  },
});
