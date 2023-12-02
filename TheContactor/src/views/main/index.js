import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import * as imageService from '../../services/imageService';
import { Text, SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Button, Modal, Pressable, TextInput, Image } from 'react-native';

const ContactItem = ({ contact }) => {
    console.log(typeof contact.uri);
    return (
        <View>
            <Text>{contact.name}</Text>
            <Text>{contact.phoneNumber}</Text>
            { typeof contact.uri === 'string' &&
                <>
                    <Image source={{ uri: contact.uri }} style={{ width: 200, height: 200 }}/>
                </>
            }
        </View>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        uri: PropTypes.any
    })
};

const Contacts = ({ navigation: { navigate } }) => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshContacts, setRefreshContacts] = useState(true);
    const [name, onChangeName] = useState(null);
    const [number, onChangeNumber] = useState(null);
    const [photo, setPhoto] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactsData = await fileService.getAllContacts();
                setContacts(contactsData);
            } catch (error) {
                console.error('Error fetching contacts', error);
            }
        };
        if (refreshContacts) {
            fetchData();
            setRefreshContacts(false);
        }
    }, [refreshContacts]);

    const getImage = async (from) => {
        try {
            if (from === 'roll') {
                const photoRequest = await imageService.selectFromCameraRoll();
                setPhoto(photoRequest);
            } else if (from === 'camera') {
                const photoRequest = await imageService.selectFromCameraRoll();
                setPhoto(photoRequest);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error('Error fetching image', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    barStyle={'dark-content'}
                    showHideTransition={'fade'}
                    hidden={false}
                />
                {contacts.map((item, key) => <ContactItem key={key} contact={item.data}/>)}
                <View>
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
                                    inputMode='numeric'
                                    clearButtonMode='always'
                                    keyboardAppearance='dark'
                                    placeholder='Phone number...'
                                />
                                <Button
                                    onPress={() => {
                                        getImage('camera');
                                        console.log(photo);
                                    }}
                                    title='Camera' />
                                <Button
                                    onPress={() => {
                                        getImage('roll');
                                        console.log(photo);
                                    }}
                                    title='Camera Roll' />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        const newContact = {
                                            name,
                                            phoneNumber: number,
                                            uri: photo
                                        };
                                        fileService.addContact(newContact);
                                        setRefreshContacts(true);
                                    }}>
                                    <Text style={styles.textStyle}>Confirm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>Add Contact</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            fileService.cleanDirectory();
                            setRefreshContacts(true);
                        }}>
                        <Text style={styles.textStyle}>Clean Directory</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

Contacts.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    input: {
        marginBottom: 10,
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
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
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        gap: 10
    },
    buttonOpen: {
        backgroundColor: '#f23006'
    },
    buttonClose: {
        backgroundColor: '#f23006',
        width: '90%'
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
    }
});

export default Contacts;
