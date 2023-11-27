import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Text } from 'react-native';

const Tasks = ({ route, navigation: { navigate } }) => {
    const { listId } = route.params;
    return (
        <>
            <Text>Welcome to the task screen for list with id {listId} </Text>
            <StatusBar style="auto" />
        </>
    );
};

Tasks.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default Tasks;
