import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { removeSubstrings } from '../../services/services';
// import { getToken } from '../../services/apiService';
import {
    Text,
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import MovieList from '../../components/MovieList';

const TheatreDetail = ({ route, navigation: { navigate, setOptions } }) => {
    const data = route.params.data;
    const { id, name, description, city, phone, website } = data;
    const address = data['address\t'];
    useEffect(() => {
        setOptions({ title: name });
    }, []);

    const parsedDescription = description ? removeSubstrings(description, ['<b>', '<br>']) : null;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ marginTop: 20, rowGap: 20, marginHorizontal: 10, backgroundColor: 'white', padding: 10, marginBottom: 10 }}>
                    {parsedDescription ? <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{parsedDescription.trim()}</Text> : null }
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{address}, {city}</Text>
                        <View style={{ flexDirection: 'column' }}>
                            {phone ? <Text>Tel: {phone}</Text> : null }
                            <Text>{website}</Text>
                        </View>
                    </View>
                </View>
                <MovieList theatreId={id} />
            </ScrollView>
        </SafeAreaView>
    );
};

TheatreDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default TheatreDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollContainer: {
    }
});
