import { Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

const MovieItem = ({ title, poster, release_year, genre }) => {
    return (
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{ uri: poster }} />
            <View style={styles.movieDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text>{release_year}</Text>
                <Text>{genre}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
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
})

MovieItem.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    release_year: PropTypes.string.isRequired,
    genre: PropTypes.string
};

export default MovieItem;