import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcoming } from '../../slices/upcomingSlice';
// import { getToken } from '../../services/apiService';
import {
    SafeAreaView,
    ScrollView,
    Text,
    ActivityIndicator
} from 'react-native';

const Upcoming = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.upcoming);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(fetchUpcoming());
        setReload(false);
    }, [reload]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : data.map((upcoming, key) => <Text key={key}>{upcoming.title}</Text>)
                }
            </ScrollView>
        </SafeAreaView>
    );
};

Upcoming.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

export default Upcoming;
