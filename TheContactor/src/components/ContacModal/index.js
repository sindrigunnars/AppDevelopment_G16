import React, { useState } from 'react';
import { Modal, View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import * as imageService from '../../services/imageService';
import * as fileService from '../../services/fileService';
import PropTypes from 'prop-types';

const AddContactModal = ({ modalVisible, setModalVisible, setRefreshContacts }) => {
    const [name, onChangeName] = useState(null);
    const [number, onChangeNumber] = useState(null);
    const [photo, setPhoto] = useState();

    const areValidInputs = () => {
        if (typeof name !== 'string' || typeof number !== 'string') { return false; }
        if (isNaN(parseInt(number))) { return false; }
        if (name.length <= 0) { return false; }
        return true;
    };

    const getImage = async (from) => {
        try {
            if (from === 'roll') {
                const photoRequest = await imageService.selectFromCameraRoll();
                setPhoto(photoRequest);
            } else if (from === 'camera') {
                const photoRequest = await imageService.takePhoto();
                setPhoto(photoRequest);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error('Error fetching image', error);
        }
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            autoFocus={false}
                            onChangeText={onChangeName}
                            placeholderTextColor='grey'
                            value={name}
                            clearButtonMode='always'
                            keyboardAppearance='dark'
                            placeholder='Name...'
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor='grey'
                            autoFocus={false}
                            onChangeText={onChangeNumber}
                            value={number}
                            maxLength={10}
                            inputMode='numeric'
                            clearButtonMode='always'
                            keyboardAppearance='dark'
                            placeholder='Phone number...'
                        />
                        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, styles.button]}
                            onPress={() => getImage('camera')}
                        >
                            <Text style={styles.textStyle}>Camera</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, styles.button]}
                            onPress={() => getImage('roll')}
                        >
                            <Text style={styles.textStyle}>Camera Roll</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { opacity: !areValidInputs() ? 0.5 : 1 }]}
                            onPress={() => {
                                setModalVisible(false);
                                const newContact = {
                                    name,
                                    phoneNumber: parseInt(number),
                                    uri: photo
                                };
                                fileService.addContact(newContact);
                                setRefreshContacts(true);
                                onChangeName(null);
                                onChangeNumber(null);
                                setPhoto();
                            }}
                            disabled={!areValidInputs()}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, styles.button]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.buttonMain, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Add Contact</Text>
            </Pressable>
        </>
    );
};

AddContactModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    setRefreshContacts: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    centeredView: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        height: '50%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        gap: 10
    },
    buttonOpen: {
        backgroundColor: '#f23006'
    },
    buttonClose: {
        backgroundColor: '#f23006',
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        minWidth: '90%',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        padding: 5
    },
    input: {
        marginBottom: 10,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 8,
        marginBottom: 16
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default AddContactModal;
