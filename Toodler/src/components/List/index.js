import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const List = ({ name, color, tasks }) => {
    const [expanded, setExpanded] = useState(false);
    const [doubleExpanded, setDoubleExpanded] = useState(null); // State to hold the index of the expanded task

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const toggleDoubleExpand = (index) => {
        setDoubleExpanded(doubleExpanded === index ? null : index); // Toggle description visibility for the selected task
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand}>
                <Text style={styles.header}>{name}</Text>
            </TouchableOpacity>
            <View style={{ ...styles.testing, backgroundColor: color }} >
                {expanded
                    ? tasks.map((task, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => toggleDoubleExpand(index)}>
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
    name: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.array
};

export default List;

const styles = StyleSheet.create({
    header: {
        fontSize: 30
    },
    text: {
        fontSize: 15
    },
    container: {
        flex: 1,
        rowGap: 5,
        justifyContent: 'space-between'
    },
    testing: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});
