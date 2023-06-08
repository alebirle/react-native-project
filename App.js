import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Game from './src/Game'
import { Button, View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CustomHeader = ({ onButton1Press, onButton2Press }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.headerContainer}>
      <Button onPress={handleShowAlert} title='Button?' color='skyblue'/>
      <CustomAlert visible={showAlert} message="Wow an alert" onClose={handleCloseAlert} />
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={ Home } 
          options={{ 
            headerStyle: { backgroundColor: 'lightblue'},
            headerRight: () => (
              <CustomHeader/>
            )
          }} 
        />
        <Stack.Screen name="Game" component={ Game } options={{ headerStyle: { backgroundColor: 'lightblue'}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'thistle',
    opacity: 0.7,
    width: 200,
    height: 130,
    borderRadius: 0,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: 'dimgrey',
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: 'thistle',
    width: 200,
    textAlign: 'left',
    padding: 10,
    marginTop: 0
  },
  button: {
    backgroundColor: 'powderblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
