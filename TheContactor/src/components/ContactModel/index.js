import React from 'react';
import { Modal, View, StyleSheet, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';

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

const windowWidth = Dimensions.get('window').height;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        padding: 5
    },
    centeredView: {
        flexGrow: 1,
        height: '100%',
        width: '100%'

    },
    modalView: {
        alignSelf: 'center',
        top: windowWidth / 5,
        flexGrow: 1.5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 100,
        elevation: 100,
        width: '90%'
    }
});
