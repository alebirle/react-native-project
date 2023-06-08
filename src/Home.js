import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

function Home({navigation}) {
   return (
      <View>
         <Text style = {styles.myState}>
            Hello
         </Text>
         <TouchableOpacity onPress={() => navigation.navigate('Game')}>
            <Text style = {styles.text}>
               Go to game
            </Text>
         </TouchableOpacity>
      </View>
   )
}
export default Home

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
    },
    text: {
        padding: 5,
        marginTop: 10,
        width: 100,
        height: 40,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'white',
        alignSelf: 'center',
        backgroundColor: 'skyblue'
    },
    myState: {
        marginTop: 50,
        textAlign: 'center',
        color: 'violet',
        fontWeight: 'bold',
        fontSize: 20
    },
    box: {
        backgroundColor: 'blue',
        width: 50,
        height: 100
    }
})