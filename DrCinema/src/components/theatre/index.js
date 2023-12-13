import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import { getToken } from '../../services/apiService';
import {
    Text,
    Pressable,
    StyleSheet
} from 'react-native';

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

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    title: {
        fontSize: 20
    }
});
