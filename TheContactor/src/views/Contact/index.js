import React, { useEffect, useState } from 'react';
import HeaderButton from '../../components/HeaderButton';
import PropTypes from 'prop-types';
import EditContactModal from '../../components/EditContactModal';
import { View } from 'react-native';
import ContactDetails from '../../components/ContactDetails';
import styles from './styles';

const Contact = ({ route, navigation: { setOptions } }) => {
    const { contact } = route.params;
    const [contactData, setContact] = useState(contact);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const headerOptions = {
            headerRight: () => <HeaderButton onPressFunc={() => setModalVisible(true)} name='pencil' />
        };
        setOptions(headerOptions);
    }, []);

    return (
        <View style={{ ...styles.main, opacity: modalVisible ? 0.2 : 1 }}>
            <EditContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} contact={contactData} setContact={setContact}/>
            <ContactDetails contact={contactData} />
        </View>
    );
};

Contact.propTypes = {
    navigation: PropTypes.shape({
        setOptions: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default Contact;
