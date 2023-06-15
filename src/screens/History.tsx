import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppContext } from '../App.provider';
import { FlatList } from 'react-native-gesture-handler';
import { format } from 'date-fns';

const History = () => {
  const appContext = useAppContext();

  const renderGame = ({ item }) => (
    <View key={item.date} style={styles.row}>
      <View style={styles.gameInfo}>
        <Text style={styles.rowText}>
          <Text style={styles.xText}>{item.xPlayer.name}</Text> vs{' '}
          <Text style={styles.oText}>{item.oPlayer.name}</Text>:{' '}
          {item.xPlayer.isWinner && item.oPlayer.isWinner
            ? 'tie'
            : item.xPlayer.isWinner
            ? item.xPlayer.name + ' won'
            : item.oPlayer.name + ' won'}{' '}
        </Text>
        <Text>{format(item.date, 'dd-MM-yyyy HH:mm:ss')}</Text>
      </View>
      <View style={styles.miniBoard}>
        {item.board
          ? item.board.map((row, rowIndex) =>
              row.map((element, colIndex) => (
                <View
                  key={rowIndex.toString() + colIndex.toString()}
                  style={[
                    styles.box,
                    element === 'X'
                      ? styles.x
                      : element === 'O'
                      ? styles.o
                      : null,
                  ]}
                />
              )),
            )
          : null}
      </View>
      <Pressable style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View>
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
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
    height: 70,
    width: '100%',
    alignContent: 'space-around',
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  rowText: {
    fontSize: 18,
  },
  box: {
    width: 10,
    height: 10,
    margin: 1,
  },
  o: {
    backgroundColor: 'pink',
    borderRadius: 5,
  },
  x: {
    backgroundColor: 'skyblue',
  },
  miniBoard: {
    flexDirection: 'row',
    width: 36,
    alignContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 30,
  },
  deleteButton: {
    justifyContent: 'center',
    flex: 1,
  },
  gameInfo: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'navy',
  },
  xText: {
    color: 'skyblue',
    fontWeight: 'bold',
  },
  oText: {
    color: 'pink',
    fontWeight: 'bold',
  },
});
