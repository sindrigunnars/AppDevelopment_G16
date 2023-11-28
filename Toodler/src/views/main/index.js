import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import AddBoard from '../../components/addBoard';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const Main = () => {
    const { data } = useContext(DataContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <Boards />
                <AddBoard newId={data.boards.length <= 0 ? 0 : data.boards[data.boards.length - 1].id}/>
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
