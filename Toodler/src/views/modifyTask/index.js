import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Modal, Pressable, View, FlatList } from 'react-native';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
);
Item.propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    textColor: PropTypes.object.isRequired
};
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
            id: modify ? task.id : data.tasks[data.tasks.length - 1].id + 1,
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

    const handleItemPress = (id) => {
        id === selectedList ? setSelectedList(null) : setSelectedList(id);
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedList ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedList ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => { handleItemPress(item.id); }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeTextName}
                    value={taskName}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={onChangeTextDescription}
                    value={taskDescription}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <FlatList
                                data={data.lists}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={selectedList}
                                style={styles.flatlist}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    if (selectedList !== null) {
                                        setData({
                                            ...data,
                                            tasks: data.tasks.map((item) => (task.id === item.id ? { ...task, listId: selectedList } : item))
                                        });
                                    }
                                    navigation.navigate('Lists', { boardId: data.lists.find((list) => list.id === (selectedList === null ? listId : selectedList)).boardId });
                                }}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Move Task</Text>
                </Pressable>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        press();
                        navigation.navigate('Lists', { boardId: data.lists.find((list) => list.id === listId).boardId });
                    }}>
                    <Text>{modify ? 'Edit Task' : 'Add Task'}</Text>
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
    flatlist: {
        flexShrink: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    centeredView: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        height: '50%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default ModifyTask;
