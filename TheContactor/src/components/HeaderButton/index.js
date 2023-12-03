import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const HeaderButton = ({ name, onPressFunc }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.photoButton]}
            onPress={() => onPressFunc()}>
            <Ionicons name={name} size={30}/>
        </Pressable>
    );
};

export default HeaderButton;

HeaderButton.propTypes = {
    name: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1,
        color: 'black'
    },
    photoButton: {
        flexGrow: 1,
        justifyContent: 'center',
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10
    }
});
