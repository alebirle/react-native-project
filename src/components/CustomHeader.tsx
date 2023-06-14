import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
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
      <Button onPress={handleShowAlert} title="Button?" color="skyblue" />
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
