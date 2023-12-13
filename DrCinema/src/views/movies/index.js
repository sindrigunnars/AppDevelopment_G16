import PropTypes from 'prop-types';
// import { getToken } from '../../services/apiService';
import {
    SafeAreaView,
    ScrollView
} from 'react-native';
import MovieItem from '../../components/MovieItem';
import MovieList from '../../components/MovieList';

const Movies = ({ route, navigation: { navigate } }) => {
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
