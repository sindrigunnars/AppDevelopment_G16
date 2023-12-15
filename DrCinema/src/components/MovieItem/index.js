import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const MovieItem = ({ data, theatreId }) => {
    const { id, title, poster, year, genres, durationMinutes, showtimes, plot } = data;
    const genre = genres.map((item) => item['NameEN\t']);
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Movie', { id, title, poster, year, genres, durationMinutes, plot, showtimes, theatreId })}>
            <Image
                style={styles.image}
                source={{ uri: poster }} />
            <View style={styles.movieDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text>{year}</Text>
                <Text>{genre.join(', ')}</Text>
            </View>
        </TouchableOpacity>
    );
};

MovieItem.propTypes = {
    data: PropTypes.object.isRequired,
    theatreId: PropTypes.number
};

export default MovieItem;
