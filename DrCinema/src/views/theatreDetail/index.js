import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
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

const TheatreDetail = ({ route, navigation: { navigate } }) => {
    const data = route.params.data;
    const { name, description, city, phone, website } = data;
    const address = data['address\t'];

    const navigation = useNavigation();

    const parsedDescription = description ? removeSubstrings(description, ['<b>', '<br>']) : null;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Pressable
                    style= {{ rowGap: 10, marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10, flexGrow: 1 }}
                    onPress={() => navigation.navigate('Movies')}>
                    <Text style={{ alignSelf: 'center' }}>{name}</Text>
                    {parsedDescription ? <Text style={{ alignSelf: 'center', textAlign: 'justify' }}>{parsedDescription.trim()}</Text> : null }
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{address} {city}</Text>
                        {phone ? <Text>{phone}</Text> : null }
                        <Text>{website}</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

TheatreDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
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
