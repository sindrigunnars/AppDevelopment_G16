import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from './styles';

const ImageButton = ({ name, onPressFunc }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.photoButton]}
            onPress={() => onPressFunc()}>
            <Ionicons style={styles.icon} name={name} />
        </Pressable>
    );
};

ImageButton.propTypes = {
    name: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired
};

export default ImageButton;
