import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '../../components/HeaderButton';
import PropTypes from 'prop-types';
import EditContactModal from '../../components/EditContactModal';
import { View, StyleSheet } from 'react-native';
import ContactDetails from '../../components/ContactDetails';

const Contact = ({ route, navigation: { navigate } }) => {
    const { contact } = route.params;
    const [contactData, setContact] = useState(contact);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const headerOptions = {
            headerRight: () => <HeaderButton onPressFunc={() => setModalVisible(true)} name='pencil' />
        };
        navigation.setOptions(headerOptions);
    }, [navigation]);
    console.log(contactData);
    return (
        <View style={styles.main}>
            <EditContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} contact={contactData} setContact={setContact}/>
            <ContactDetails contact={contactData} />
        </View>
    );
};

Contact.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%'
    }
});

export default Contact;
