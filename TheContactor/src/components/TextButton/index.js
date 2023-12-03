import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const TextButton = ({ text, onPressFunc, disabled }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: (pressed || disabled) ? 0.5 : 1 }, styles.button]}
            onPress={() => onPressFunc()}
            disabled={disabled === undefined ? false : disabled}
        >
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    );
};

export default TextButton;

TextButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 15,
        marginBottom: 16,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
