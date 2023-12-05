import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import TextButton from '../TextButton';
import ImageButton from '../ImageButton';
import * as imageService from '../../services/imageService';
import * as fileService from '../../services/fileService';
import PropTypes from 'prop-types';
import ContactModal from '../ContactModel';
import styles from './styles';

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
        if (number.length < 3) { return false; }
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
                maxLength={15}
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
            { photoReady && photo !== ''
                ? <View><Text>Image Selected!</Text></View>
                : <View></View>
            }
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

export default AddContactModal;
