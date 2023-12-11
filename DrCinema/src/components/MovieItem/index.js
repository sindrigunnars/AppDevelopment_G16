import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ id, title, poster, year, genres, durationMinutes, plot }) => {
    const genre = genres[0]['NameEN\t'];
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Movie', { id, title, poster, year, genres, durationMinutes, plot })}>
            <Image
                style={styles.image}
                source={{ uri: poster }} />
            <View style={styles.movieDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text>{year}</Text>
                <Text>{genre}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20
    },
    movieDetails: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        fontSize: 20
    },
    image: {
        width: 70,
        height: '100%'
    }
});

MovieItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    year: PropTypes.string.isRequired,
    genres: PropTypes.array,
    durationMinutes: PropTypes.number,
    plot: PropTypes.string
};

export default MovieItem;
