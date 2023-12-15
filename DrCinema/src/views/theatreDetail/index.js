import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { removeSubstrings } from '../../services/services';
// import { getToken } from '../../services/apiService';
import {
    Text,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import MovieList from '../../components/MovieList';
import styles from './styles';

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
                <View style={styles.details}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>{name}</Text>
                            <Text>{address}, {city}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            {phone ? <Text>Tel: {phone}</Text> : null}
                            <Text>{website}</Text>
                        </View>
                    </View>
                    {parsedDescription ? <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{parsedDescription.trim()}</Text> : null}
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
