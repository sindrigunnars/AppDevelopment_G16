import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../data';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from './styles';

const ItemView = ({ item, navigation, lists, imageSourceProp }) => {
    const [finalImageSource, setFinalImageSource] = useState(imageSourceProp);
    const { data, setData } = useContext(DataContext);

    const handleImageError = () => {
    // If the image fails to load, replace it with a default URL
        setFinalImageSource({ uri: 'https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg' });
    };

    useEffect(() => {
        setFinalImageSource(imageSourceProp);
    }, [imageSourceProp]);

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
                source={finalImageSource}
                onError={handleImageError}
                style={styles.image}
            >
                <Text style={styles.headline}>{item.name}</Text>
                {item.description !== undefined && (
                    <View style={styles.descriptionBox}>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
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
    lists: PropTypes.array.isRequired,
    imageSourceProp: PropTypes.object.isRequired
};

export default ItemView;
