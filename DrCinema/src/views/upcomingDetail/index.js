import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Pressable,
    Image,
    ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

const UpcomingDetail = ({ route, navigation: { navigate, setOptions } }) => {
    const data = route.params.data;
    const poster = data.poster; // added
    const releaseDate = data['release-dateIS'] || 'Release-Date Unknown.';
    const trailers = data.trailers;

    // working out the trailers here
    const trailerDetails = [trailers[0]?.results.map(result => ({
        key: 'https://www.youtube.com/watch?v=' + result.key,
        name: result.name,
        iso_639_1: result.iso_639_1
    }))];

    return (
        <ScrollView>
            <Text style={styles.title}>Væntanleg {releaseDate}.</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: poster }} />
            </View>
            { trailers[0] && (trailers[0].results[0] !== undefined)
                ? <View style={styles.divider} />
                : null
            }
            <View>
                {trailerDetails.map((trailer, index) => (
                    <View key={index}>
                        {trailer?.reverse().map((item, itemIndex) => (
                            <Pressable key={itemIndex}>
                                <Text style={styles.trailerTitle}>{item.name} [{item.iso_639_1}]</Text>
                                <WebView
                                    source={{ uri: item.key }}
                                    mediaPlaybackRequiresUserAction={true}
                                    style={{ width: '90%', height: 250, marginBottom: 40, alignSelf: 'center', borderRadius: 20 }}
                                    startInLoadingState={true}
                                    thirdPartyCookiesEnabled={false}
                                    hardwareAccelerationDisabledAndroid={true}
                                />
                            </Pressable>
                        ))}
                    </View>
                ))}
            </View>
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
