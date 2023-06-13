import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export const CustomDrawerContentComponent = (props) => {
  const { state, navigation, descriptors } = props;

  return (
    <DrawerContentScrollView>
      <View style={styles.drawer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>

      <DrawerItemList
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />

      <Image source={require('../assets/favicon.png')} style={styles.image} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: { alignSelf: 'center', width: 50, height: 50 },
  drawer: { padding: 16 },
});
