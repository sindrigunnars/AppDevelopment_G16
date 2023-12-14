import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Pressable,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';

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
            { trailers[0]
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

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center'
    },
    imageContainer: {
        marginBottom: 15
    },
    trailerTitle: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: '5%'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginVertical: 20,
        textAlign: 'center'
    }
});
