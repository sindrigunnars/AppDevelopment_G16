import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const List = ({ list }) => {
    const { name, color, tasks } = list;
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null); // State to hold the index of the expanded task

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const toggleDoubleExpand = (index) => {
        setDoubleExpanded(doubleExpanded === index ? null : index); // Toggle description visibility for the selected task
    };

    return (
        <View style={styles.listList}>
            <TouchableOpacity style={{ ...styles.list, backgroundColor: color }} onPress={toggleExpand}>
                <Text style={styles.header}>{name}</Text>
            </TouchableOpacity>
            <View style={styles.taskList} >
                {expanded
                    ? tasks.map((task, index) => {
                        return (
                            <TouchableOpacity style={styles.individualTask} key={index} onPress={() => toggleDoubleExpand(index)}>
                                <Text>{task.name}</Text>
                                {doubleExpanded === index && <Text>{task.description}</Text>}
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
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10
    },
    taskList: {
    },
    individualTask: {
    }
});
