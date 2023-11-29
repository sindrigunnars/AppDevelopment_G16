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

    const press = () => {
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
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeText}
                    value={boardName}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeImage}
                    value={imgUrl}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        press();
                        navigation.navigate('Boards');
                    }}>
                    <Text>{modify ? 'Edit Board' : 'Add Board'}</Text>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

export default ModifyBoard;
