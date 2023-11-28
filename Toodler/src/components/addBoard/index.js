import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddBoard = ({ stateChanger, boardsLength }) => {
    const [boardName, onChangeText] = useState('New board name...');
    const retVal = (
        <>
            <TextInput
                style={styles.input}
                autoFocus={false}
                onChangeText={onChangeText}
                value={boardName}
            />
            <TouchableOpacity style={styles.button}
                onPress={() => stateChanger({
                    id: boardsLength + 1,
                    name: boardName,
                    thumbnailPhoto:
                        'https://images-na.ssl-images-amazon.com/images/I/61fq9A8jEGL._SL1500_.jpg'
                })}>
                <Text>Add Board</Text>
            </TouchableOpacity>
        </>
    );
    return retVal;
};

AddBoard.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    boardsLength: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});

export default AddBoard;
