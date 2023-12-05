import React from 'react';
import { Modal, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ContactModal = ({ modalVisible, setModalVisible, children, text }) => {
    return (
        <>
            <Modal
                animationType="slide"
                style={styles.centeredView}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>{text}</Text>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
    );
};

ContactModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired
};

export default ContactModal;
