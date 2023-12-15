import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

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
