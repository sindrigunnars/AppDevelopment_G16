import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import ContactModal from '../../components/ContactModal';
import SearchBar from '../../components/SearchBar';
import ContactItem from '../../components/ContactItem';
import { Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, Pressable } from 'react-native';

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
            <ScrollView
                style={{ ...styles.scrollContainer, opacity: modalVisible ? 0.2 : 1 }}>
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
                        .filter((item) => item.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((filteredItem, key) => (
                            <ContactItem key={key} contact={filteredItem.data} />
                        ))
                }
                <ContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} setRefreshContacts={setRefreshContacts} />
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
        paddingHorizontal: 20
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
    }
});

export default Contacts;
