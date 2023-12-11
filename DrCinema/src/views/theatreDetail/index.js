import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { removeSubstrings } from '../../services/services';
// import { getToken } from '../../services/apiService';
import {
    Text,
    View,
    Pressable,
    ScrollView,
    SafeAreaView,
    StyleSheet
} from 'react-native';

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
                <View style={{ marginTop: 10, rowGap: 20 }}>
                    {parsedDescription ? <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{parsedDescription.trim()}</Text> : null }
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{address}, {city}</Text>
                        <View style={{ flexDirection: 'column' }}>
                            {phone ? <Text>{phone}</Text> : null }
                            <Text>{website}</Text>
                        </View>
                    </View>
                </View>
                <Pressable
                    style= {{ rowGap: 10, marginBottom: 10, backgroundColor: '#62b0ba', padding: 10, flexGrow: 1, marginTop: 10 }}
                    onPress={() => navigate('Movies', { id })}
                >
                    <Text style={{ alignSelf: 'center' }}> See movies </Text>
                </Pressable>
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
        paddingHorizontal: 20
    }
});
