import React from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const ContactItem = ({ contact }) => {
    const navigation = useNavigation();
    return (
        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }, styles.contact]}
            onPress={() => navigation.navigate('Contact', { contact })}
        >
            { (typeof contact.data.uri === 'string' && contact.data.uri !== '')
                ? <>
                    <Image source={{ uri: contact.data.uri }} style={styles.contactImage}/>
                </>
                : <>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' }} style={styles.contactImage}/>
                </>
            }
            <Text style={styles.contactText}>{contact.data.name}</Text>
        </Pressable>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        data: PropTypes.shape({
            name: PropTypes.string.isRequired,
            phoneNumber: PropTypes.number.isRequired,
            uri: PropTypes.any
        })
    })
};

export default ContactItem;
