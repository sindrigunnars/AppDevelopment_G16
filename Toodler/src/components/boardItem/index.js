import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

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
        <TouchableOpacity key={item.id} style={styles.boardContainer} onPress={() => navigation.navigate('Lists', { boardId: item.id, lists })}>
            <ImageBackground
                source={imageSource}
                onError={handleImageError}
                style={styles.image}
            >
                <Text style={styles.headline}>{item.name}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Board', { modify: true, board: item })}>
                        <Text style={styles.buttonText} >Edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.line}></Text>
                    <TouchableOpacity style={styles.button} onPress={() => deleteBoard(item.id)}>
                        <Text style={styles.buttonText} >Delete</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
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
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        maxWidth: '90%'
    },
    image: {
        height: 200,
        resizeMode: 'center',
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headline: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'white'
    },
    button: {
        width: '50%',
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#f0785a',
        padding: 5
    },
    buttons: {
        flexShrink: 1,
        justifyContent: '',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    },
    line: {
        width: 1,
        backgroundColor: 'black'
    }
});

export default ItemView;
