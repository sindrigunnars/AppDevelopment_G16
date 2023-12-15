import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Pressable
} from 'react-native';
import styles from './styles';

const Theatre = ({ data }) => {
    const { name, website } = data;
    const navigation = useNavigation();
    return (
        <Pressable
            style= {styles.item}
            onPress={() => navigation.navigate('Theater', { data })}>
            <Text style={styles.title}>{name}</Text>
            <Text>{website}</Text>
        </Pressable>
    );
};

Theatre.propTypes = {
    data: PropTypes.object.isRequired
};

export default Theatre;
