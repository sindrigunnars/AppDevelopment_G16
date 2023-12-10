import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../slices/moviesSlice';
// import { getToken } from '../../services/apiService';
import {
    SafeAreaView,
    ScrollView,
    Text,
    ActivityIndicator
} from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useSelector((state) => state.movies);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(fetchMovies());
        setReload(false);
        // const response = getToken();
        // response.then((res) => {
        //     console.log(res);
        // });
    }, [reload]);

    if (isError) return <Text>ERROR</Text>;

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {data.map((movies, key) => <Text key={key}>{movies.title}</Text>)}
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
