import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ImageButton = ({ name, onPressFunc }) => {
    return (
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.photoButton]}
            onPress={() => onPressFunc()}>
            <Ionicons style={styles.icon} name={name} />
        </Pressable>
    );
};

export default ImageButton;

ImageButton.propTypes = {
    name: PropTypes.string.isRequired,
    onPressFunc: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1,
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        color: 'white'
    },
    photoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 10
    }
});
