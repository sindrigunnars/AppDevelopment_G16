import React, { useContext } from 'react';
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

const Lists = ({ route, navigation: { navigate } }) => {
    const { boardId } = route.params;
    const { data } = useContext(DataContext);
    // const [lists, setLists] = useState([]);
    //
    // useEffect(() => {
    // // looping through the data to retrieve the lists for the board in question
    //     const listData = data.lists
    //         .filter((list) => list.boardId === boardId)
    //         .map((list) => ({
    //             id: list.id,
    //             name: list.name,
    //             color: list.color,
    //             tasks: data.tasks.filter((task) => task.listId === list.id)
    //         }));
    //     setLists(listData);
    // }, []); // runs when component mounts
    const lists = data.lists.filter((list) => list.boardId === boardId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <Text style={styles.coolstyle}>{data.boards.find((board) => board.id === boardId).name}</Text>
                {lists.map((list) => <List key={list.id} style={styles.item} list={list} />)}
                <TouchableOpacity onPress={() => navigate('Edit List', {modify: false, list: null, boardId})}>
                <Text>Add List</Text>
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
    coolstyle: {
        fontSize: 40
    }
});
