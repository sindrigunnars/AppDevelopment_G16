import React from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactItem = ({ contact, setRefreshContacts }) => {
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
    }),
    setRefreshContacts: PropTypes.func.isRequired
};

export default ContactItem;

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        flexShrink: 1,
        overflow: 'hidden'
    },
    contactImage: {
        height: 60, // Adjust the height based on your text size or dynamic calculation
        aspectRatio: 1, // Maintain the aspect ratio to avoid stretching
        borderRadius: 30, // Apply borderRadius for rounded corners
        marginRight: 8 // Adjust spacing as needed
    },
    contactText: {
        marginLeft: 16,
        maxWidth: '75%',
        fontSize: 20
    }
});
