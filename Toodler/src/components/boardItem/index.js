import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ItemView = ({ item, navigation, lists }) => {
    const [imageSource, setImageSource] = useState({ uri: item.thumbnailPhoto });
    const { data, setData } = useContext(DataContext);

    const handleImageError = () => {
    // If the image fails to load, replace it with a default URL
        setImageSource({ uri: 'https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg' });
    };

    const deleteBoard = (boardId) => {
        const newLists = data.lists.filter((list) => list.boardId !== boardId);
        setData({
            boards: [...data.boards.filter((board) => board.id !== boardId)],
            lists: [...newLists],
            tasks: [...data.tasks.filter((task) => newLists.map((list) => list.id).includes(task.listId))]
        });
    };

    return (
        <View key={item.id} style={styles.boardContainer}>
            <Image
                source={imageSource}
                onError={handleImageError}
                style={styles.image}
            />
            <Text style={styles.headline}>{item.name}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lists', { boardId: item.id, lists })}>
                    <Text>See lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Board', { modify: true, board: item })}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => deleteBoard(item.id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

ItemView.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    item: PropTypes.object.isRequired,
    lists: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
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

export default ItemView;
