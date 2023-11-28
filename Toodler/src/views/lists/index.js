import React, { useContext, useEffect, useState } from 'react';
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
    const [lists, setLists] = useState([]);

    useEffect(() => {
    // looping through the data to retrieve the lists for the board in question
        const listData = [];
        data.lists.forEach((item) => {
            if (item.boardId === boardId) {
                listData.push({
                    key: item.id,
                    name: item.name,
                    color: '',
                    tasks: []
                });
            }
            listData.forEach((item) => {
                const taskList = [];

                data.tasks.forEach((task) => {
                    if (task.listId === item.key) {
                        taskList.push(task);
                        // console.log("Found task " + task.id);
                    }
                });
                // console.log("Updated");
                item.tasks = taskList; // updates list info after we found the tasks
            });
            setLists(listData);
        });

    // console.log(listData);
    }, []); // runs when component mounts

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <Text style={styles.coolstyle}>Board {boardId}</Text>
                {lists.map((list) => <List key={list.key} style={styles.item} name={list.name} color={list.color} tasks={list.tasks} />)}
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
