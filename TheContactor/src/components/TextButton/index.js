import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const TextButton = ({ text, onPressFunc, disabled, style }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: (pressed || disabled) ? 0.5 : 1 }, styles.button, style]}
            onPress={() => onPressFunc()}
            disabled={disabled === undefined ? false : disabled}
        >
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    );
};

TextButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object
};

export default TextButton;
