import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { FlatList } from 'react-native-gesture-handler';
import { format } from 'date-fns';

const History = () => {
  const appContext = useAppContext();

  const renderGame = ({ item }) => (
    <Text style={styles.row}>
      {item.xPlayer.name} {item.xPlayer.isWinner.toString()} {item.oPlayer.name}{' '}
      {item.oPlayer.isWinner.toString()}{' '}
      {format(item.date, 'dd-MM-yyyy HH:mm:ss')}
    </Text>
  );

  return (
    <View>
      <FlatList
        data={appContext.pastGames.slice().reverse()}
        renderItem={renderGame}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    height: 50,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    backgroundColor: 'beige',
  },
});
