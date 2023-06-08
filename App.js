import 'react-native-gesture-handler';
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from './src/Home';
import Game from './src/Game'
import { Button, View, TouchableOpacity, StyleSheet, Modal, Text, Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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

const CustomHeader = () => {
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

const CustomDrawerContentComponent = ({ navigation, ...props }) => {
  return (
    <DrawerContentScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Menu</Text>
      </View>

      <DrawerItemList {...props} />

      <Image source={require('./assets/favicon.png')} style={{ alignSelf: 'center', width: 50, height: 50}}/>
    </DrawerContentScrollView>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContentComponent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'lightblue',
            width: 250,
          },
          drawerActiveTintColor: 'dimgray',
          drawerInactiveTintColor: 'dimgray',
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={ Home } 
          options={{ 
            headerStyle: { backgroundColor: 'lightblue'},
            headerRight: () => (
              <CustomHeader/>
            )
          }} 
        />
        <Drawer.Screen name="Game" component={ Game } options={{ headerStyle: { backgroundColor: 'lightblue'}}} />
      </Drawer.Navigator>
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
  headerContainer: {
    marginRight: 20
  }
});
