import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';

const IndividualTask = ({ task, listId, toggleTaskFinished, deleteTask, toggleDoubleExpand, doubleExpanded }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.taskWrapper}>
            <View style={styles.task}>
                <View style={styles.checkBox}>
                    <BouncyCheckbox // gorgeous checkbox for checking off tasks
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
                <View style={styles.taskButtons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Task', { modify: true, task, listId })}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: 'red' }} onPress={() => deleteTask(task.id)}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>{task.description}</Text>
            </View>
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
    checkBox: {
        width: '50%',
        padding: 5
    },
    taskWrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: 10
    },
    description: {
        textAlign: 'center'
    },
    descriptionWrapper: {
        borderBottomWidth: 1,
        padding: 5
    },
    task: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

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
        justifyContent: 'space-evenly',
        width: '50%',
        maxHeight: 40
    },
    button: {
        width: '35%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: '#f2f2f2',
        padding: 10
    }
});

export default IndividualTask;
