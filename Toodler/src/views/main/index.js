import React, { useState, useCallback, createContext } from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import AddBoard from '../../components/addBoard';
import jsonData from '../../resources/data.json';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
const DataContext = createContext();

const Main = () => {
    const [data, setData] = useState(jsonData);

    const addBoard = useCallback((board) => {
        setData({
            ...data,
            lists: data.lists,
            boards: [...data.boards, board]
        });
    }, [data, setData]);

    const deleteBoard = useCallback((boardId) => {
        setData({
            ...data,
            boards: [...data.boards.filter((board) => board.id !== boardId)]
        });
    }, [data, setData]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            <SafeAreaView style={styles.container}>
                <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                    <Boards boards={data.boards} lists={data.lists} stateChanger={deleteBoard}/>
                    <AddBoard stateChanger={addBoard} newId={data.boards[data.boards.length - 1].id}/>
                </ScrollView>
            </SafeAreaView>
        </DataContext.Provider>
    );
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

export default Main;
