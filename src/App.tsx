import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Game from './screens/Game';
import { CustomDrawerContentComponent } from './components/CustomDrawerContentComponent';
import { CustomHeader } from './components/CustomHeader';
import { AppProvider } from './App.provider';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  const showCustomHeader = React.useCallback(() => {
    return <CustomHeader />;
  }, []);

  const showDrawer = React.useCallback((props) => {
    return <CustomDrawerContentComponent {...props} />;
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={showDrawer}
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
            component={Home}
            options={{
              headerStyle: { backgroundColor: 'lightblue' },
              headerRight: showCustomHeader,
            }}
          />
          <Drawer.Screen
            name="Game"
            component={Game}
            options={{ headerStyle: { backgroundColor: 'lightblue' } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
