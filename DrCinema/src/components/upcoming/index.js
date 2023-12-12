import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    Image,
    View,
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
            style={{ rowGap: 10, marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}
        >
            <Text style={{ alignSelf: 'center' }}>{title}</Text>
            <View>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }} source={{ uri: thumbnail }} />
            </View>
            <Text style={{ alignSelf: 'center' }}>{ releaseDate }</Text>
        </TouchableOpacity>
    );
};

Upcoming.propTypes = {
    data: PropTypes.object.isRequired
};

export default Upcoming;
