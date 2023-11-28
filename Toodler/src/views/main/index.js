import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import AddBoard from '../../components/addBoard';
import jsonData from '../../resources/data.json';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const Main = () => {
    const [data, setData] = useState(jsonData);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <DataContext.Provider value={{ data, setData }}>
                    <Boards />
                    <AddBoard newId={data.boards.length <= 0 ? 0 : data.boards[data.boards.length - 1].id}/>
                </DataContext.Provider>
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
