import React, { useState, useContext, useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { useNavigation } from '@react-navigation/native';
import IndividualTask from '../taskItem';
import styles from './styles';

const List = ({ list }) => {
    const { id, name, color, boardId } = list;
    const { data, setData } = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null);
    const navigation = useNavigation();
    const tasks = data.tasks.filter((task) => task.listId === list.id);

    const toggleDoubleExpand = useCallback((index) => { // expands selected task
        setDoubleExpanded(doubleExpanded === index ? null : index);
    }, [doubleExpanded, setDoubleExpanded]);

    const toggleExpand = () => { // expands selected list
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

    const deleteList = (listId) => {
        const newTasks = data.tasks.filter((task) => task.listId !== id);
        setData({
            boards: [...data.boards],
            lists: [...data.lists.filter((list) => list.id !== id)],
            tasks: [...newTasks]
        });
    };

    return (
        <View style={styles.listList}>
            <TouchableOpacity style={{ ...styles.list, backgroundColor: color === '#' ? '#ffffff' : color }} onPress={toggleExpand}>
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
                        style={styles.taskButton} // button for ADDING A TASK
                        onPress={() => navigation.navigate('Edit Task', { modify: false, task: null, listId: id })}
                    >
                        <Text style={styles.taskButtonText}>Add Task</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit List', { modify: true, list, boardId })}>
                        <Text style={styles.buttonText}>Edit List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => deleteList(id)}>
                        <Text style={styles.buttonText}>Delete List</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

List.propTypes = {
    list: PropTypes.object.isRequired
};

export default List;
