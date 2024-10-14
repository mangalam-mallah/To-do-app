import { StyleSheet, Text, View, Modal,TouchableOpacity } from 'react-native'
import React from 'react'

const DeleteAlert = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirm Delete</Text>
          <Text style={styles.message}>Are you sure you want to delete this item?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#6A4CFF' }]} onPress={onConfirm}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteAlert

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    },
    modalContainer: {
        width: 320,
        padding: 25,
        backgroundColor: '#ffffff',
        borderRadius: 20, 
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333', 
    },
    message: {
        fontWeight : '500',
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
        color: '#666666', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30, 
        backgroundColor: '#6A4CFF', 
        shadowColor: '#6A4CFF',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        flex: 1,
        marginHorizontal: 5, 
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff', 
        textAlign: 'center',
    },
})