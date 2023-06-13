import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Home({ navigation }) {
  return (
    <View>
      <Text style={styles.greeting}>Please type your names:</Text>
      <TextInput
        style={styles.playerInput}
        placeholder="Player 1 (X)"
        placeholderTextColor={'gray'}
      />
      <TextInput
        style={styles.playerInput}
        placeholder="Player 2 (O)"
        placeholderTextColor={'gray'}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Game')}>
        <Text style={styles.text}>Start game</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  text: {
    padding: 5,
    marginTop: 10,
    width: 200,
    height: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 1,
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
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 1,
    padding: 5,
  },
});
