import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';

const IndividualTask = ({ task, listId, toggleTaskFinished, deleteTask, toggleDoubleExpand, doubleExpanded }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.task}>
            <View style={styles.checkBox}>
                <BouncyCheckbox
                    size={25}
                    isChecked={task.isFinished}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text={task.name}
                    iconStyle={{ borderColor: 'red' }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={() => toggleTaskFinished(task.id)}
                    onLongPress={() => toggleDoubleExpand(task.id)}
                />
            </View>
            {doubleExpanded === task.id && (
                <View style={styles.task}>
                    <Text>{task.description}</Text>
                    <View style={styles.taskButtons}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Task', { modify: true, task, listId })}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => deleteTask(task.id)}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
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
    checkBox: {
        padding: 5
    },
    task: {
        flex: 1,
        flexDirection: 'column',
        gap: 10

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
        justifyContent: 'space-around'
    },
    button: {
        width: '47.5%',
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

export default IndividualTask;
