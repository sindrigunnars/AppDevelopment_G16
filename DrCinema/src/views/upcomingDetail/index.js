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
    const title = data.title;
    const poster = data.poster; // added
    const releaseDate = data['release-dateIS'] || 'Release-Date Unknown.';
    const trailers = data.trailers;

    // working out the trailers here
    const trailerDetails = [trailers[0]?.results.map(result => ({
        key: 'https://www.youtube.com/watch?v=' + result.key,
        name: result.name,
        iso_639_1: result.iso_639_1
    }))];

    // const trailerDetails = trailers.map(trailer => {
    //     const results = trailer.results.map(result => ({
    //         key: 'https://www.youtube.com/watch?v=' + result.key,
    //         name: result.name,
    //         iso_639_1: result.iso_639_1
    //     }));
    //     return results;
    // });

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: poster }} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.info}>Væntanleg {releaseDate}.</Text>
            <View>
                { /* show the key of each trailer here */ }
                {trailerDetails.map((trailer, index) => (
                    <View key={index}>
                        {trailer?.map((item, itemIndex) => (
                            <Pressable key={itemIndex}>
                                <Text style={styles.trailerTitle}>{item.name} [{item.iso_639_1}]</Text>
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
            <View style={styles.pageBottom}></View>
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

// styles pretty much taken from movie details, slightly edited
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        maxHeight: '100%', // fixed important issue
        resizeMode: 'contain'
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginVertical: 10,
        textAlign: 'center'
    },
    trailerTitle: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: '5%'
    },
    pageBottom: { // I feel like there's a smarter fix to this problem, but it's past 22:00 so ehhh
        marginBottom: '175%'
    },
    genres: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center'
    }
});
