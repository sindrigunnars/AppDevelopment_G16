import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
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
    individualTask: {
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: '1em'
    }
});

export default IndividualTask;
