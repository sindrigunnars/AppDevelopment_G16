import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import ContactModal from '../../components/ContactModal';
import SearchBar from '../../components/SearchBar';
import ContactItem from '../../components/ContactItem';
import TextButton from '../../components/TextButton';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import HeaderButton from '../../components/HeaderButton';
import { useNavigation } from '@react-navigation/native';

const Contacts = ({ navigation: { navigate } }) => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshContacts, setRefreshContacts] = useState(true);
    const [searchTerm, onSearchTerm] = useState('');
    const [clicked, setClicked] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderButton onPressFunc={() => setModalVisible(true)} name='add'/>
        });
    }, []);

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
                    ? contacts.map((item, key) => <ContactItem key={key} contact={item}/>)
                    : contacts
                        .filter((item) => item.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((filteredItem, key) => (
                            <ContactItem key={key} contact={filteredItem} />
                        ))
                }
                <ContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} setRefreshContacts={setRefreshContacts} />
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
    }
});

export default Contacts;
