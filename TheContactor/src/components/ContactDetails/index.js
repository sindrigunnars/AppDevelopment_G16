import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const ContactDetails = ({ contact }) => {
    return (
        <View style={styles.container}>
            { (typeof contact.data.uri === 'string' && contact.data.uri !== '') // checking if an image was chosen, if not we display a 'default profile picture'
                ? <>
                    <Image source={{ uri: contact.data.uri }} style={styles.image}/>
                </>
                : <>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} style={styles.image}/>
                </>
            }
            <Text style={styles.name}>{contact.data.name}</Text>
            <Text style={styles.number}>{contact.data.phoneNumber}</Text>
            <Ionicons style={styles.callBtn} name="call" size={34} color="green" onPress={() => {
                Linking.openURL(`tel:${contact.data.phoneNumber}`);
            }} />
        </View>);
};

ContactDetails.propTypes = {
    contact: PropTypes.shape({
        data: PropTypes.shape({
            name: PropTypes.string.isRequired,
            phoneNumber: PropTypes.number.isRequired,
            uri: PropTypes.any
        })
    })
};

export default ContactDetails;
