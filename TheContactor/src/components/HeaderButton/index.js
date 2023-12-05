import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from './styles';

const HeaderButton = ({ name, onPressFunc }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.photoButton]}
            onPress={() => onPressFunc()}>
            <Ionicons name={name} size={30}/>
        </Pressable>
    );
};

HeaderButton.propTypes = {
    name: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired
};

export default HeaderButton;
