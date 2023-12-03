import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import TextButton from '../TextButton';
import ImageButton from '../ImageButton';
import * as imageService from '../../services/imageService';
import * as fileService from '../../services/fileService';
import PropTypes from 'prop-types';
import ContactModal from '../ContactModel';

const EditContactModal = ({ modalVisible, setModalVisible, contact, setContact }) => {
    const [name, onChangeName] = useState(contact.name);
    const [number, onChangeNumber] = useState(contact.phoneNumber.toString());
    const [photo, setPhoto] = useState(contact.uri);

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

    const editContact = async () => {
        const newContact = {
            name,
            phoneNumber: parseInt(number),
            uri: photo
        };
        if (contact.phoneNumber !== number) {
            await fileService.removeContact(contact);
            fileService.addContact(newContact);
        } else {
            fileService.editContact(newContact);
        }
        setModalVisible(false);
        setContact(newContact);
    };

    return (
        <ContactModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={'Edit Contact'}
        >
            <TextInput
                style={styles.input}
                autoFocus={false}
                onChangeText={onChangeName}
                placeholderTextColor='grey'
                value={name}
                clearButtonMode='always'
                keyboardAppearance='dark'
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
                onPressFunc={() => editContact()}
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

EditContactModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.number.isRequired,
        uri: PropTypes.string
    }),
    setContact: PropTypes.func.isRequired
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

export default EditContactModal;
