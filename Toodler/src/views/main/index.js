import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import AddBoard from '../../components/addBoard';
import jsonData from '../../resources/data.json';
import { ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const Main = () => {
    const [data, setData] = useState(jsonData);
    const updateBoards = useCallback((board) => {
        setData({
            ...data,
            boards: [...data.boards, board]
        });
    }, [data, setData]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <Boards boards={data.boards} lists={data.lists}/>
                <AddBoard stateChanger={updateBoards} boardsLength={data.boards.length}/>
            </ScrollView>
        </SafeAreaView>
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
