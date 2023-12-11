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
    const [reload, setReload] = useState(false);
    useEffect(() => {
        dispatch(fetchMovies());
        setReload(false);
    }, [reload]);

    if (isError) return <Text>ERROR: {errorMessage}</Text>;
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading
                    ? <ActivityIndicator size="large" />
                    : data.map((movie, key) => <MovieItem key={key} title={movie.title} poster={movie.poster} genre={movie.genres[0]['NameEN\t']} release_year={movie.year} />)
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
