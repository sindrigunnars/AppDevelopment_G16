import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import TextButton from '../TextButton';
import ImageButton from '../ImageButton';
import * as imageService from '../../services/imageService';
import * as fileService from '../../services/fileService';
import PropTypes from 'prop-types';
import ContactModal from '../ContactModel';

const AddContactModal = ({ modalVisible, setModalVisible, setRefreshContacts }) => {
    const [name, onChangeName] = useState(null);
    const [number, onChangeNumber] = useState(null);
    const [photo, setPhoto] = useState();
    const [photoReady, setPhotoReady] = useState();

    const areValidInputs = () => {
        if (typeof name !== 'string' || typeof number !== 'string') { return false; }
        if (photoReady !== undefined && !photoReady) { return false; }
        if (isNaN(parseInt(number))) { return false; }
        if (name.length <= 0) { return false; }
        return true;
    };

    const getImage = async (from) => {
        setPhotoReady(false);
        try {
            if (from === 'roll') {
                await imageService.selectFromCameraRoll().then((image) => {
                    setPhoto(image);
                });
            } else if (from === 'camera') {
                await imageService.takePhoto().then((image) => {
                    setPhoto(image);
                });
            }
            setPhotoReady(true);
        } catch (error) {
            console.error('Error fetching image', error);
        }
    };

    const addContact = async () => {
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
        setPhotoReady();
    };

    return (
        <ContactModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={'Add Contact'}
        >
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
                onPressFunc={() => addContact()}
                text={'Confirm'}
                disabled={!areValidInputs()}
            />
            <TextButton
                onPressFunc={() => setModalVisible(false)}
                text={'Cancel'}
            />
        </ContactModal>
    );
};

AddContactModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    setRefreshContacts: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
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
