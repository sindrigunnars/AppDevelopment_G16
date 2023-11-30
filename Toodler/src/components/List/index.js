import React, { useState, useContext, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { useNavigation } from '@react-navigation/native';
import IndividualTask from '../taskItem';

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
            <TouchableOpacity onPress={()=> navigation.navigate('Edit List', {modify: true, list})}>
                <Text>Edit List</Text>
            </TouchableOpacity>
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
    }
});
