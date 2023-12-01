import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import {
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from './styles';

const ModifyList = ({ route, navigation }) => {
    const { data, setData } = useContext(DataContext);
    const { modify, list, boardId } = route.params;
    const [name, setName] = useState(modify ? list.name : 'List name...');
    const [color, setColor] = useState(modify ? list.color : '#');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: modify ? 'Edit List' : 'Add List'
        });
    }, [navigation, modify]);

    const press = () => {
        const newList = {
            id: modify ? list.id : (data.lists.length <= 0) ? 1 : data.lists[data.lists.length - 1].id + 1,
            name,
            color,
            boardId
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
        return ((color === '#') || (color === '')) ? true : hexColorValidFormat.test(color);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={setName}
                    value={name}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                    clearTextOnFocus={(name === 'List name...')}
                />
                <TextInput
                    style={styles.input}
                    autoFocus={false}
                    onChangeText={setColor}
                    value={color}
                    clearButtonMode='always'
                    keyboardAppearance='dark'
                />
                <TouchableOpacity style={[styles.button, { opacity: !isValidColor(color) ? 0.5 : 1 }]}
                    onPress={() => {
                        press();
                        navigation.navigate('Lists', { boardId });
                    }}
                    disabled={!isValidColor(color)} // can't press the button unless the hex code is valid
                >
                    <Text style={styles.textStyle}>{modify ? 'Edit List' : 'Add List'}</Text>
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

export default ModifyList;
