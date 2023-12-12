import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const Upcoming = ({ data }) => {
    const navigation = useNavigation();
    const title = data.title;
    const thumbnail = data.poster;
    const releaseDate = data['release-dateIS'] || 'Release-Date Unknown.';

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Upcoming Trailer', { data })}
            style={styles.item}
        >
            <Image style={styles.image} source={{ uri: thumbnail }} />
            <View style={styles.movieDetails}>
                <Text style={styles.title}>{title}</Text>
                <Text>{ releaseDate }</Text>
            </View>
        </TouchableOpacity>
    );
};

Upcoming.propTypes = {
    data: PropTypes.object.isRequired
};

export default Upcoming;

// copying the style of movies
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
