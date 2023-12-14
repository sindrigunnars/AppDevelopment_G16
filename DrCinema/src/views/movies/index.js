import React from 'react';
import PropTypes from 'prop-types';
import {
    SafeAreaView,
    ScrollView
} from 'react-native';
import MovieList from '../../components/MovieList';

const Movies = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <MovieList />
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
