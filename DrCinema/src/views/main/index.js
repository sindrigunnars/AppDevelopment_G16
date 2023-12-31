import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheaters } from '../../slices/theatersSlice';
import Theatre from '../../components/theatre';
import {
    SafeAreaView,
    ScrollView,
    Text,
    ActivityIndicator
} from 'react-native';
import styles from './styles';

const Main = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.theaters);
    const token = useSelector((state) => state.token.data);

    useEffect(() => {
        dispatch(fetchTheaters(token));
    }, [dispatch]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : data.map((theater, key) => <Theatre key={key} data={theater}/>)
                }
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
