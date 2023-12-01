import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation, useTheme } from '@react-navigation/native';
import styles from './styles';

const IndividualTask = ({ task, listId, toggleTaskFinished, deleteTask }) => {
    const navigation = useNavigation();
    const theme = useTheme();
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
                        textStyle={{ color: theme.colors.rawText }}
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
                <Text style={{ ...styles.description, color: theme.colors.rawText }}>{task.description}</Text>
            </View>
        </View>
    );
};

IndividualTask.propTypes = {
    task: PropTypes.object.isRequired,
    listId: PropTypes.number.isRequired,
    toggleTaskFinished: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default IndividualTask;
