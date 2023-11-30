import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const ModifyBoard = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, board } = route.params;
    const [boardName, onChangeText] = useState(modify ? board.name : 'Board name...');
    const [imgUrl, onChangeImage] = useState(modify ? board.thumbnailPhoto : 'Enter image url here...');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: modify ? 'Edit Board' : 'Add Board'
        });
    }, [navigation, modify]);

    const press = () => { // the button is pressed and the board is created/updated
        const newBoard = {
            id: modify ? board.id : (data.boards.length <= 0) ? 1 : data.boards[data.boards.length - 1].id + 1,
            name: boardName,
            thumbnailPhoto: imgUrl
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
                    inputMode='url'
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeImage}
                    value={imgUrl}
                    editable={true}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 40,
        maxHeight: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default ModifyBoard;
