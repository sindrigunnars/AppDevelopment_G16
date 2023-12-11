import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheaters } from '../../slices/theatersSlice';
import Theatre from '../../components/theatre';
import { useNavigation } from '@react-navigation/native'; // not sure this is meant to be here, but alas
// import { getToken } from '../../services/apiService';
import {
    SafeAreaView,
    ScrollView,
    Text,
    ActivityIndicator,
    StyleSheet,
    Pressable
} from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.theaters);
    const [reload, setReload] = useState(false);
    const navigation = useNavigation(); // not sure this is meant to be here

    useEffect(() => {
        dispatch(fetchTheaters());
        setReload(false);
    }, [reload]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    const compareNames = (a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        return nameA.localeCompare(nameB, 'is', { sensitivity: 'base' });
    };

    const sortedData = [...data].sort(compareNames);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : sortedData.map((theater, key) => <Theatre key={key} data={theater}/>)
                }

                <Pressable onPress={() => navigation.navigate('Upcoming')} style={styles.upcomingButton}>
                    <Text>UPCOMING BUTTON</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollContainer: {
        paddingHorizontal: 20
    },
    upcomingButton: {
        alignItems: 'center',
        backgroundColor: 'cadetblue'
    }
});
