import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import List from '../../components/list';
import { DataContext } from '../../components/data';

const Lists = ({ route, navigation: { navigate } }) => {
    const { boardId } = route.params;
    const { data } = useContext(DataContext);

    const lists = data.lists.filter((list) => list.boardId === boardId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
                <Text style={styles.coolstyle}>{data.boards.find((board) => board.id === boardId).name}</Text>
                {lists.map((list) => <List key={list.id} style={styles.item} list={list} />)}
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
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingVertical: 20
    },
    coolstyle: {
        fontSize: 40
    }
});
