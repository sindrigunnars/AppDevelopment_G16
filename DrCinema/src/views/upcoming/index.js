import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcoming } from '../../slices/upcomingSlice';
import UpcomingComp from '../../components/upcoming';
import {
    SafeAreaView,
    ScrollView,
    Text,
    ActivityIndicator
} from 'react-native';

const Upcoming = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.upcoming);
    const token = useSelector((state) => state.token.data);

    useEffect(() => {
        dispatch(fetchUpcoming(token));
    }, [dispatch]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : data.map((upcoming, key) => <UpcomingComp key={key} data={upcoming}/>)
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
