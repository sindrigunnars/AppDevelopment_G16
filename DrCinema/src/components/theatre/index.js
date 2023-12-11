import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import { getToken } from '../../services/apiService';
import {
    Text,
    View,
    Pressable
} from 'react-native';

const Theatre = ({ data }) => {
    const { name, description, city, phone, website } = data;
    const address = data['address\t'];
    const navigation = useNavigation();

    const removeSubstrings = (inputString, substringsToRemove) => {
        const escapedSubstrings = substringsToRemove.map(substring => substring.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
        const regex = new RegExp(escapedSubstrings, 'g');
        return inputString.replace(regex, '');
    };

    const parsedDescription = description ? removeSubstrings(description, ['<b>', '<br>']) : null;

    return (
        <Pressable
            style= {{ rowGap: 10, marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}
            onPress={() => navigation.navigate('Movies')}>
            <Text style={{ alignSelf: 'center' }}>{name}</Text>
            {parsedDescription ? <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{parsedDescription.trim()}</Text> : null }
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{address} {city}</Text>
                {phone ? <Text>{phone}</Text> : null }
                <Text>{website}</Text>
            </View>
        </Pressable>
    );
};

Theatre.propTypes = {
    data: PropTypes.object.isRequired
};

export default Theatre;
