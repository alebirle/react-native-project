import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal, View, Text, StyleSheet } from 'react-native';

export const CustomAlert = ({ visible, message, onClose }) => {
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
    marginTop: 0,
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
