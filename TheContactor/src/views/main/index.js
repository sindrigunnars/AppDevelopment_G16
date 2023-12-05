import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import AddContactModal from '../../components/AddContactModal';
import SearchBar from '../../components/SearchBar';
import ContactItem from '../../components/ContactItem';
import TextButton from '../../components/TextButton';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import HeaderButton from '../../components/HeaderButton';
import styles from '../main/styles';

const Contacts = ({ navigation: { setOptions, addListener } }) => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshContacts, setRefreshContacts] = useState(true);
    const [searchTerm, onSearchTerm] = useState('');
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setOptions({
            headerRight: () => <HeaderButton onPressFunc={() => setModalVisible(true)} name='add'/>
        });
    }, []);

    const fetchData = async () => {
        try {
            const contactsData = await fileService.getAllContacts();
            setContacts(contactsData);
        } catch (error) {
            console.error('Error fetching contacts', error);
        }
    };

    useEffect(() => {
        if (refreshContacts) {
            fetchData();
            setRefreshContacts(false);
        }
    }, [refreshContacts]);

    useEffect(() => {
        const unsubscribeFocus = addListener('focus', () => {
            fetchData();
        });
        return unsubscribeFocus;
    }, []);

    const compareNames = (a, b) => {
        const nameA = a.data.name.toLowerCase();
        const nameB = b.data.name.toLowerCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    };

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
                    ? contacts
                        .sort(compareNames)
                        .map((item, key) => <ContactItem key={key} contact={item} setRefreshContacts={setRefreshContacts}/>)
                    : contacts
                        .filter((item) => item.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .sort(compareNames)
                        .map((filteredItem, key) => (
                            <ContactItem key={key} contact={filteredItem} setRefreshContacts={setRefreshContacts}/>
                        ))
                }
                <AddContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} setRefreshContacts={setRefreshContacts} />
                <TextButton
                    onPressFunc={() => {
                        fileService.cleanDirectory();
                        setRefreshContacts(true);
                    }}
                    text={'Clean Directory'}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

Contacts.propTypes = {
    navigation: PropTypes.shape({
        setOptions: PropTypes.func.isRequired,
        addListener: PropTypes.func.isRequired
    }).isRequired
};

export default Contacts;
