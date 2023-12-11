import React, { useEffect, useState } from 'react';
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
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(fetchUpcoming(token));
        setReload(false);
    }, [reload]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    const compareDate = (a, b) => {
        const dateA = a['release-dateIS'] || 'Release-Date Unknown.';
        const dateB = b['release-dateIS'] || 'Release-Date Unknown.';
        return dateA.localeCompare(dateB, 'is', { sensitivity: 'base' });
    };

    const sortedData = [...data].sort(compareDate);

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    // : data.map((upcoming, key) => <Text key={key}>{upcoming.title + upcoming.releaseDate}</Text>)
                    : sortedData.map((upcoming, key) => <UpcomingComp key={key} data={upcoming}/>)
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
