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
import MovieItem from '../../components/MovieItem';

const Movies = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.movies);
    const token = useSelector((state) => state.token.data);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(fetchMovies(token));
        setReload(false);
    }, [reload]);

    const compareTitles = (a, b) => {
        const titleA = a.title;
        const titleB = b.title;
        return titleA.localeCompare(titleB, 'is', { sensitivity: 'base' });
    };

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    const sortedData = data ? [...data].sort(compareTitles) : null;

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : sortedData.map((movie, key) => <MovieItem key={key} data={movie}/>)
                }
            </ScrollView>
        </SafeAreaView>
    );
};

Movies.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

export default Movies;
