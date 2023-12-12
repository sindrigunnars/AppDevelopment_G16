import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Pressable,
    ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';

const UpcomingDetail = ({ route, navigation: { navigate, setOptions } }) => {
    const data = route.params.data;
    const title = data.title;
    const releaseDate = data['release-dateIS'] || 'Release-Date Unknown.';
    const trailers = data.trailers;

    // working out the trailers here
    const trailerDetails = trailers.map(trailer => {
        const results = trailer.results.map(result => ({
            key: 'https://www.youtube.com/watch?v=' + result.key,
            name: result.name,
            iso_639_1: result.iso_639_1
        }));
        return results;
    });

    return (
        <ScrollView>
            <ScrollView>
                <View style={{ alignSelf: 'center', marginVertical: 20 }}>
                    <Text>{title}</Text>
                    <Text>{releaseDate}</Text>
                </View>
                <View>
                    { /* show the key of each trailer here */ }
                    {trailerDetails.map((trailer, index) => (
                        <View key={index}>
                            {trailer.map((item, itemIndex) => (
                                <Pressable key={itemIndex}>
                                    <Text style={{ alignSelf: 'center' }}>{item.name} [{item.iso_639_1}]</Text>

                                    <WebView
                                        source={{ uri: item.key }}
                                        mediaPlaybackRequiresUserAction={true}
                                        style={{ width: '90%', height: 250, marginBottom: 40, alignSelf: 'center', borderRadius: 20 }}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

UpcomingDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default UpcomingDetail;
