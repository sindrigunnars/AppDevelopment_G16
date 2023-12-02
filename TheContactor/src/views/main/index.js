import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import { Text, SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';

const ContactItem = ({ contact }) => {
    return (
        <View>
            <Text>{contact.name}</Text>
            <Text>{contact.phoneNumber}</Text>
        </View>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.number.isRequired
    })
};

const Contacts = ({ navigation: { navigate } }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactsData = await fileService.getAllContacts();
                setContacts(contactsData);
            } catch (error) {
                console.error('Error fetching contacts', error);
            }
        };
        fetchData();
    }, [contacts]);

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
        flex: 1
    }
});

export default Contacts;
