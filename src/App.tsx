import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import History from './screens/History';
import { CustomDrawerContentComponent } from './components/CustomDrawerContentComponent';
import { CustomHeader } from './components/CustomHeader';
import { AppProvider } from './App.provider';
import Game from './screens/Game';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

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
        <Drawer.Navigator initialRouteName="Home" drawerContent={showDrawer}>
          <Drawer.Screen
            name="XO Game"
            component={HomeStackScreen}
            options={{
              headerStyle: { backgroundColor: 'lightblue' },
              headerRight: showCustomHeader,
            }}
          />
          <Drawer.Screen
            name="History"
            component={History}
            options={{ headerStyle: { backgroundColor: 'lightblue' } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
