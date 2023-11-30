import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import TaskModal from '../../components/moveTaskModal';
import { ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const ModifyTask = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, task, listId } = route.params;
    const [taskName, onChangeTextName] = useState(modify ? task.name : 'Task name...');
    const [taskDescription, onChangeTextDescription] = useState(modify ? task.description : 'Description...');
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
                    clearTextOnFocus={(taskName === 'Task name...')}
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
                    clearTextOnFocus={(taskDescription === 'Description...')}
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
                <TouchableOpacity style={styles.button}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 40,
        maxHeight: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default ModifyTask;
