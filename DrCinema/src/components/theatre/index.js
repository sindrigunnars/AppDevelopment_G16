import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import { getToken } from '../../services/apiService';
import {
    Text,
    Pressable
} from 'react-native';

const Theatre = ({ data }) => {
    const { name, website } = data;
    const navigation = useNavigation();
    return (
        <Pressable
            style= {{ rowGap: 10, marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}
            onPress={() => navigation.navigate('Theatre', { data })}>
            <Text style={{ alignSelf: 'center' }}>{name}</Text>
            <Text>{website}</Text>
        </Pressable>
    );
};

Theatre.propTypes = {
    data: PropTypes.object.isRequired
};

export default Theatre;
