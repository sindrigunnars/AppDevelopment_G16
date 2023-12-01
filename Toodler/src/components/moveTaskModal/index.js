import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import {
    Text,
    Modal,
    Pressable,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

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

const TaskModal = ({ modalVisible, setModalVisible, selectedList, setSelectedList, navigation, task, listId }) => {
    const { data, setData } = useContext(DataContext);

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
        <View>
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
        </View>
    );
};

TaskModal.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func
    }).isRequired,
    task: PropTypes.object.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    selectedList: PropTypes.number,
    setSelectedList: PropTypes.func.isRequired,
    listId: PropTypes.number.isRequired
};

export default TaskModal;
