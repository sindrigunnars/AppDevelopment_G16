import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Image,
    View,
    Pressable
} from 'react-native';

const Upcoming = ({ data }) => {
    const title = data.title;
    const thumbnail = data.poster;
    const releaseDate = data['release-dateIS'] || 'Release-Date Unknown.';

    // <Image style={{ alignSelf: 'center', width: '100px' }} source={{ uri: thumbnail }} resizeMode="contain" />
    // <Image style={{ width: '100%', height: '100%' }} source={{ uri: { thumbnail } }} />
    return (
        <Pressable
            style= {{ rowGap: 10, marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}>
            <Text style={{ alignSelf: 'center' }}>{title}</Text>
            <View>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }} source={{ uri: thumbnail }} />
            </View>
            <Text style={{ alignSelf: 'center' }}>{ releaseDate }</Text>
            { /* <Image style={{ alignSelf: 'center' }} source={{ uri: thumbnail }} /> */ }
        </Pressable>
    );
};

Upcoming.propTypes = {
    data: PropTypes.object.isRequired
};

export default Upcoming;
