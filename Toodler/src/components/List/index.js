import React, { useState, useContext, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { useNavigation } from '@react-navigation/native';

const IndividualTask = ({ task, listId, toggleTaskFinished, deleteTask, toggleDoubleExpand, doubleExpanded }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.individualTask} onPress={() => toggleDoubleExpand(task.id)}>
            <Text>{task.name}</Text>
            { doubleExpanded === task.id && (
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
                        <TouchableOpacity onPress={() => navigation.navigate('Edit Task', { modify: true, task, listId })}>
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
};

IndividualTask.propTypes = {
    task: PropTypes.object.isRequired,
    listId: PropTypes.number.isRequired,
    toggleTaskFinished: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleDoubleExpand: PropTypes.func.isRequired,
    doubleExpanded: PropTypes.number
};

const List = ({ list }) => {
    const { id, name, color } = list;
    const { data, setData } = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null);
    const navigation = useNavigation();
    const tasks = data.tasks.filter((task) => task.listId === list.id);

    const toggleDoubleExpand = useCallback((index) => {
        setDoubleExpanded(doubleExpanded === index ? null : index);
    }, [doubleExpanded, setDoubleExpanded]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleTaskFinished = (taskId) => {
        setData({
            boards: [...data.boards],
            lists: [...data.lists],
            tasks: [...data.tasks.map((task) =>
                task.id === taskId ? { ...task, isFinished: !task.isFinished } : task
            )]
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
            <View style={styles.taskList}>
                {expanded && tasks.map((task, index) => (
                    <IndividualTask
                        task={task}
                        key={index}
                        listId={id}
                        toggleTaskFinished={toggleTaskFinished}
                        toggleDoubleExpand={toggleDoubleExpand}
                        doubleExpanded={doubleExpanded}
                        deleteTask={deleteTask}
                    />
                ))}
                {expanded && (
                    <TouchableOpacity
                        style={styles.button} // button for ADDING A TASK
                        onPress={() => navigation.navigate('Edit Task', { modify: false, task: null, listId: id })}
                    >
                        <Text>Add Task</Text>
                    </TouchableOpacity>
                )}
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
        justifyContent: 'space-between',
        columnGap: '1em'
    }
});
