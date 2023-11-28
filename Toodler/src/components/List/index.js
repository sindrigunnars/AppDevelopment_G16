import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const List = ({ name, color, tasks }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
        console.log('Expanded');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand}>
                <Text style={styles.header}>{name}</Text>
            </TouchableOpacity>
            <View style={{ ...styles.testing, backgroundColor: color }}>
                {expanded
                    ? tasks.map((task, indx) => {
                        return <Text key={indx}> {task.name} </Text>;
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
