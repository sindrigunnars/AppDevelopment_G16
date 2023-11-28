import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemView = (item, key, list, navigation, lists, stateChanger) => {
    const onPress = (list, navigation) => {
        navigation.navigate('Lists', { boardId: list, lists });
    };
    return (
        <View key={key} style={styles.boardContainer}>
            <Image source={{ uri: item.thumbnailPhoto }} style={styles.image}/>
            <Text style={styles.headline}>{item.name}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(list, navigation)}>
                    <Text>See lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => onPress(list, navigation)}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => stateChanger(item.id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Boards = ({ boards, lists, stateChanger }) => {
    const boardDivs = boards;
    const navigation = useNavigation();
    navigation.removeListener();
    return (
        <View style={styles.container}>
            { boardDivs.map((item, key) => ItemView(item, key, item.id, navigation, lists, stateChanger)) }
        </View>
    );
};

Boards.propTypes = {
    boards: PropTypes.array.isRequired,
    lists: PropTypes.array.isRequired,
    stateChanger: PropTypes.func.isRequired
};

export default Boards;

const styles = StyleSheet.create({
    container: {
        rowGap: 5
    },
    boardContainer: {
        flex: 1,
        rowGap: 5,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden'
    },
    image: {
        height: 150,
        resizeMode: 'center'
    },
    headline: {
        textAlign: 'center',
        fontSize: 20
    },
    button: {
        width: '33%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
