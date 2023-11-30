import React, { useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import List from '../../components/list';
import { DataContext } from '../../components/data';
import { useNavigation } from '@react-navigation/core';

const Lists = ({ route, navigation: { navigate } }) => {
    const { boardId } = route.params;
    const { data } = useContext(DataContext);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: data.boards.find((board) => board.id === boardId).name
        });
    }, [navigation]);

    const lists = data.lists.filter((list) => list.boardId === boardId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
                {lists.map((list) => <List key={list.id} style={styles.item} list={list} />)}
                <TouchableOpacity style={styles.button}
                    onPress={() => navigate('Edit List', { modify: false, list: null, boardId })}>
                    <Text style={styles.textStyle}>Add List</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

Lists.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default Lists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        gap: 10
    },
    button: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
