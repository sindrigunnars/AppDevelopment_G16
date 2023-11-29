import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { useNavigation } from '@react-navigation/native';

const List = ({ list }) => {
    const { id, name, color } = list;
    const { data, setData } = useContext(DataContext);
    const tasks = data.tasks.filter((task) => task.listId === list.id);
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null);
    const navigation = useNavigation();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const toggleDoubleExpand = (index) => {
        setDoubleExpanded(doubleExpanded === index ? null : index);
    };

    const toggleTaskFinished = (taskId) => {
        /* Toggling a chosen task's 'isFinished' attribute. */

        const newTasks = data.tasks;
        newTasks.forEach(task => {
            if (task.id === taskId) {
                task.isFinished = !task.isFinished;
            } // (this seems like maybe not the smartest way to do this, so if anyone has any other ideas do tell)
        });

        setData({
            boards: [...data.boards],
            lists: [...data.lists],
            tasks: [...newTasks]
        });
    };

    const deleteTask = (taskId) => {
        const newTasks = data.tasks.filter((task) => task.id !== taskId); // filter out this ONE task
        setData({
            boards: [...data.boards],
            lists: [...data.lists],
            tasks: [...newTasks]
        });
    };

    return (
        <View style={styles.listList}>
            <TouchableOpacity style={{ ...styles.list, backgroundColor: color }} onPress={toggleExpand}>
                <Text style={styles.header}>{name}</Text>
            </TouchableOpacity>
            <View style={styles.taskList} >
                {expanded // ------------------------------------------ EXPANDING LIST TO SHOW TASKS
                    ? tasks.map((task, index) => {
                        return (
                            <TouchableOpacity style={styles.individualTask} key={index} onPress={() => toggleDoubleExpand(index)}>
                                <Text>{task.name}</Text>
                                {doubleExpanded === index && ( // ----- EXPAuwuNDING TASK TO SHOW TASK INFO AND OPTIONS
                                    <View>
                                        <Text>{task.description}</Text>
                                        <View style={styles.taskButtons}>
                                            {task.isFinished === false
                                                ? (
                                                    <TouchableOpacity onPress={() => toggleTaskFinished(task.id)}>
                                                        <Text>Mark Done</Text>
                                                    </TouchableOpacity>
                                                )
                                                : (
                                                    <TouchableOpacity onPress={() => toggleTaskFinished(task.id)}>
                                                        <Text>Mark Undone</Text>
                                                    </TouchableOpacity>
                                                )}
                                            <TouchableOpacity onPress={() => navigation.navigate('Edit Task', { modify: true, task: task, listId: id })}>
                                                <Text>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteTask(task.id)}>
                                                <Text>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )}
                            </TouchableOpacity>
                        );
                    })
                    : null}
            </View>
        </View>
    );
};

List.propTypes = {
    list: PropTypes.object.isRequired
};

export default List;

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 2,
        borderTopWidth: 2
    },
    header: {
        fontSize: 30
    },
    text: {
        fontSize: 15
    },
    listList: {
    },
    taskList: {
    },
    individualTask: {
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row',
        columnGap: '1em'
    }
});
