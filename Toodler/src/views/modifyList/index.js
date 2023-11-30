import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const ModifyList = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, list, boardId} = route.params;
    const [name, setName] = useState(modify ? list.name : 'List name...');
    const [color, setColor] = useState(modify ? list.color : '#');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: modify ? 'Edit List' : 'Add List'
        });
    }, [navigation, modify]);

    const press = () => {
        const newList = {
            id: modify ? list.id : data.lists[data.lists.length - 1].id + 1,
            name,
            color,
            boardId,
        };

        if (modify) {
            editList(newList);
        } else {
            addList(newList);
        }
    };

    const addList = (list) => {
        setData({
            ...data,
            lists: [...data.lists, list]
        });
    };

    const editList = (list) => {
        setData({
            ...data,
            lists: data.lists.map((item) => (item.id === list.id ? list : item))
        });
    };

    const isValidColor = (color) => {
        const hexColorValidFormat = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/; // so both 6-letter long and 3-letter long hexes will work
        return hexColorValidFormat.test(color);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={setColor}
                    value={color}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        press();
                        navigation.navigate('Lists', {boardId: boardId});
                    }}
                    disabled={!isValidColor(color)} // can't press the button unless the hex code is valid
                    >
                    <Text>{modify ? 'Edit List' : 'Add List'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

ModifyList.propTypes = {
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
    }
});

export default ModifyList;
