import React, { useState } from 'react';
import { Modal, View, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import TextButton from '../TextButton';
import ImageButton from '../ImageButton';
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
                style={styles.centeredView}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Add Contact</Text>
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
                        <View style={styles.photoButtons}>
                            <ImageButton
                                onPressFunc={() => getImage('camera')}
                                name={'camera'}
                            />
                            <Text style={styles.divider}></Text>
                            <ImageButton
                                onPressFunc={() => getImage('roll')}
                                name={'image'}
                            />
                        </View>
                        <TextButton
                            onPressFunc={() => {
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
                            text={'Confirm'}
                            disabled={!areValidInputs()}
                        />
                        <TextButton
                            onPressFunc={() => setModalVisible(false)}
                            text={'Cancel'}
                        />
                    </View>
                </View>
            </Modal>
            <TextButton
                onPressFunc={() => setModalVisible(true)}
                text={'Add Contact'}
            />
        </>
    );
};

AddContactModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    setRefreshContacts: PropTypes.func.isRequired
};

const windowWidth = Dimensions.get('window').height;

const styles = StyleSheet.create({
    centeredView: {
        flexGrow: 1,
        height: '100%',
        width: '100%'

    },
    modalView: {
        alignSelf: 'center',
        top: windowWidth / 5,
        flexGrow: 1.5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 100,
        elevation: 100,
        width: '90%'
    },
    buttonOpen: {
        backgroundColor: '#f23006'
    },
    buttonClose: {
        backgroundColor: '#80ff80',
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
        marginBottom: 16,
        width: '100%',
        padding: 15,
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
        padding: 15,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    photoButtons: {
        flexGrow: 1,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16
    },
    divider: {
        width: 1,
        backgroundColor: 'white'
    }
});

export default AddContactModal;
