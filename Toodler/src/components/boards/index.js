import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemView = (item, key, list, navigation, lists) => {
    const onPress = (list, navigation) => {
        navigation.navigate('Lists', { boardId: list, lists });
    };

    return (
        <View key={key} style={styles.boardContainer}>
            <Image source={{ uri: item.thumbnailPhoto }} style={styles.image}/>
            <Text style={styles.headline}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onPress(list, navigation)}>
                <Text>See lists</Text>
            </TouchableOpacity>
        </View>
    );
};

const Boards = ({ boards, lists }) => {
    const boardDivs = boards;
    const navigation = useNavigation();
    navigation.removeListener();
    return (
        <View style={styles.container}>
            { boardDivs.map((item, key) => ItemView(item, key, item.id, navigation, lists)) }
        </View>
    );
};

Boards.propTypes = {
    boards: PropTypes.array.isRequired,
    lists: PropTypes.array.isRequired
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
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});
