import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '../../components/HeaderButton';
import PropTypes from 'prop-types';
import EditContactModal from '../../components/EditContactModal';

const Contact = ({ route, navigation: { navigate } }) => {
    const { data } = route.params;
    const [contact, setContact] = useState(data);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderButton onPressFunc={() => setModalVisible(true)} name='pencil'/>
        });
    }, []);
    return (
        <EditContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} contact={contact} setContact={setContact}/>
    );
};

Contact.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default Contact;
