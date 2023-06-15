import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { CustomAlert } from './CustomAlert';

export const CustomHeader = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={handleShowAlert}>
        <Text>Button?</Text>
      </Pressable>
      <CustomAlert
        visible={showAlert}
        message="Wow an alert"
        onClose={handleCloseAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginRight: 20,
  },
});
