import React, { useState, useContext, useCallback } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DataContext } from '../data';

const List = ({ list }) => {
    const { name, color, tasks } = list;
    const { data, setData } = useContext(DataContext); // line taken from boards
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const toggleDoubleExpand = (index) => {
        setDoubleExpanded(doubleExpanded === index ? null : index);
    };

    const toggleTaskFinished = useCallback((taskId) => {
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
    }, [data, setData]);

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
                                            <TouchableOpacity>
                                                <Text>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
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
