import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import {
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from './styles';

const ModifyBoard = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, board } = route.params;
    const [boardName, onChangeText] = useState(modify ? board.name : 'Board name...');
    const [imgUrl, onChangeImage] = useState(modify ? board.thumbnailPhoto : 'Enter image url here...');
    const [description, onChangeDescription] = useState(modify ? (board.description !== undefined ? board.description : 'Enter description here...') : 'Enter description here...');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: modify ? 'Edit Board' : 'Add Board'
        });
    }, [navigation, modify]);

    const press = () => { // the button is pressed and the board is created/updated
        const newBoard = {
            id: modify ? board.id : (data.boards.length <= 0) ? 1 : data.boards[data.boards.length - 1].id + 1,
            name: boardName,
            thumbnailPhoto: imgUrl,
            description: ((description === 'Enter description here...') || description === '') ? undefined : description
        };

        if (modify) {
            editBoard(newBoard);
        } else {
            addBoard(newBoard);
        }
    };

    const addBoard = (board) => {
        setData({
            ...data,
            boards: [...data.boards, board]
        });
    };

    const editBoard = (newBoard) => {
        setData({
            ...data,
            boards: data.boards.map((item) => (item.id === newBoard.id ? newBoard : item))
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeText}
                    value={boardName}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    clearTextOnFocus={(boardName === 'Board name...')}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeImage}
                    value={imgUrl}
                    editable={true}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    inputMode='url'
                    clearTextOnFocus={(imgUrl === 'Enter image url here...')}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeDescription}
                    value={description}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    clearTextOnFocus={(description === 'Enter description here...')}
                    numberOfLines={4}
                    maxLength={100}
                    multiline={true}
                    editable={true}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        press();
                        navigation.navigate('Boards');
                    }}>
                    <Text style={styles.textStyle} >{modify ? 'Edit Board' : 'Add Board'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

ModifyBoard.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired
};

export default ModifyBoard;
