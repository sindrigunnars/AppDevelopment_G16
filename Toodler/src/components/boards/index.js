import React, { useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DataContext } from '../data';

const ItemView = (item, key, list, navigation, lists, stateChanger) => {
    const onPress = (list, navigation) => {
        navigation.navigate('Lists', { boardId: list, lists });
    };

    return (
        <View key={key} style={styles.boardContainer}>
            <Image source={{ uri: item.thumbnailPhoto }} style={styles.image}/>
            <Text style={styles.headline}>{item.name}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(list, navigation)}>
                    <Text>See lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onPress(list, navigation)}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => stateChanger(item.id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Boards = () => {
    const { data, setData } = useContext(DataContext);

    const deleteBoard = useCallback((boardId) => {
        setData({
            boards: [...data.boards.filter((board) => board.id !== boardId)],
            lists: [...data.lists.filter((list) => list.boardId !== boardId)],
            tasks: [...data.tasks.filter((task) => (task.listId in data.lists.map((list) => list.id)))]
        });
    }, [data, setData]);

    const boardDivs = data.boards;
    const navigation = useNavigation();
    navigation.removeListener();
    if (boardDivs.length > 0) {
        return (
            <View style={styles.container}>
                { boardDivs.map((item, key) => ItemView(item, key, item.id, navigation, data.lists, deleteBoard)) }
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>There are no boards</Text>
            </View>
        );
    }
};

export default Boards;

const styles = StyleSheet.create({
    container: {
        rowGap: 5
    },
    boardContainer: {
        flex: 1,
        rowGap: 5,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        height: 150,
        resizeMode: 'center'
    },
    headline: {
        textAlign: 'center',
        fontSize: 20
    },
    button: {
        width: '33%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
