import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import AddContactModal from '../../components/addContactModal';
import { Feather, Entypo } from '@expo/vector-icons';
import { Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, Pressable, Image, View, TextInput, Keyboard, Button } from 'react-native';

const ContactItem = ({ contact }) => {
    return (
        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, styles.contact]}>
            { typeof contact.uri === 'string' &&
                <>
                    <Image source={{ uri: contact.uri }} style={styles.contactImage}/>
                </>
            }
            { typeof contact.uri !== 'string' &&
                <>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} style={styles.contactImage}/>
                </>
            }
            <Text style={styles.contactText}>{contact.name}</Text>
        </Pressable>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.number.isRequired,
        uri: PropTypes.any
    })
};

const SearchBar = ({ searchTerm, onSearchTerm, clicked, setClicked }) => {
    return (
        <View style={styles.searchContainer}>
            <View
                style={
                    clicked
                        ? styles.searchBar__clicked
                        : styles.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchTerm}
                    onChangeText={onSearchTerm}
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        onSearchTerm('');
                    }}/>
                )}
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setClicked(false);
                            onSearchTerm('');
                        }}
                    />
                </View>
            )}
        </View>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    clicked: PropTypes.bool.isRequired,
    setClicked: PropTypes.func.isRequired
};

const Contacts = ({ navigation: { navigate } }) => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshContacts, setRefreshContacts] = useState(true);
    const [searchTerm, onSearchTerm] = useState('');
    const [clicked, setClicked] = useState(false);

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    barStyle={'dark-content'}
                    showHideTransition={'fade'}
                    hidden={false}
                />
                <SearchBar searchTerm={searchTerm} onSearchTerm={onSearchTerm} clicked={clicked} setClicked={setClicked}/>
                {!clicked
                    ? contacts.map((item, key) => <ContactItem key={key} contact={item.data}/>)
                    : contacts
                        .filter((item) => item.data.name.includes(searchTerm))
                        .map((filteredItem, key) => (
                            <ContactItem key={key} contact={filteredItem.data} />
                        ))
                }
                <AddContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} setRefreshContacts={setRefreshContacts} />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        fileService.cleanDirectory();
                        setRefreshContacts(true);
                    }}>
                    <Text style={styles.textStyle}>Clean Directory</Text>
                </Pressable>
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
        justifyContent: 'center'
    },
    scrollContainer: {
        marginHorizontal: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        height: 45,
        marginBottom: 16
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contact: {
        flexDirection: 'row',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        flexShrink: 1,
        overflow: 'hidden'
    },
    contactImage: {
        height: 60, // Adjust the height based on your text size or dynamic calculation
        aspectRatio: 1, // Maintain the aspect ratio to avoid stretching
        borderRadius: 30, // Apply borderRadius for rounded corners
        marginRight: 8 // Adjust spacing as needed
    },
    contactText: {
        marginLeft: 16,
        maxWidth: '75%',
        fontSize: 20
    },
    searchContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center'
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    searchInput: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%'
    }
});

export default Contacts;
