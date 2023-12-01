import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import TaskModal from '../../components/moveTaskModal';
import {
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from './styles';
import isValidString from '../../components/validString';

const ModifyTask = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, task, listId } = route.params;
    const [taskName, onChangeTextName] = useState(modify ? task.name : null);
    const [taskDescription, onChangeTextDescription] = useState(modify ? task.description : null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedList, setSelectedList] = useState(listId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: modify ? 'Edit Task' : 'Add Task'
        });
    }, [navigation, modify]);

    const press = () => {
        const newTask = {
            id: modify ? task.id : (data.tasks.length <= 0) ? 1 : data.tasks[data.tasks.length - 1].id + 1,
            name: taskName,
            description: taskDescription,
            isFinished: false,
            listId
        };

        if (modify) {
            editTask(newTask);
        } else {
            addTask(newTask);
        }
    };

    const addTask = (task) => {
        setData({
            ...data,
            tasks: [...data.tasks, task]
        });
    };

    const editTask = (newTask) => {
        setData({
            ...data,
            tasks: data.tasks.map((item) => (item.id === newTask.id ? newTask : item))
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeTextName}
                    value={taskName}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    placeholder='Task name...'
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeTextDescription}
                    value={taskDescription}
                    numberOfLines={4}
                    maxLength={100}
                    multiline={true}
                    editable={true}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    placeholder='Description...'
                />
                {modify && (
                    <TaskModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                        navigation={navigation}
                        task={task}
                        listId={listId}
                    />
                )}
                <TouchableOpacity style={{ ...styles.button, opacity: !isValidString(taskName) ? 0.5 : 1 }}
                    disabled={!isValidString(taskName)}
                    onPress={() => {
                        press();
                        navigation.navigate('Lists', { boardId: data.lists.find((list) => list.id === listId).boardId });
                    }}>
                    <Text style={styles.textStyle}>{modify ? 'Edit Task' : 'Add Task'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

ModifyTask.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired
};

export default ModifyTask;
