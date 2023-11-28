import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DataContext } from '../data';

const AddBoard = ({ newId }) => {
    const [boardName, onChangeText] = useState('New board name...');
    const { data, setData } = useContext(DataContext);

    const addBoard = (board) => {
        setData({
            ...data,
            lists: data.lists,
            boards: [...data.boards, board]
        });
    };

    const retVal = (
        <>
            <TextInput
                style={styles.input}
                autoFocus={false}
                onChangeText={onChangeText}
                value={boardName}
            />
            <TouchableOpacity style={styles.button}
                onPress={() => addBoard({
                    id: newId + 1,
                    name: boardName,
                    thumbnailPhoto:
                        'https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg'
                })}>
                <Text>Add Board</Text>
            </TouchableOpacity>
        </>
    );
    return retVal;
};

AddBoard.propTypes = {
    newId: PropTypes.number.isRequired
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
