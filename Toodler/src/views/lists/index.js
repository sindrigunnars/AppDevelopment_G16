import React from 'react';
import PropTypes from 'prop-types';
import { Button, StatusBar, Text } from 'react-native';

const Lists = ({ route, navigation: { navigate } }) => {
    const { boardId } = route.params;
    return (
        <>
            <Text>Welcome to the list screen for board with id {boardId} </Text>
            <StatusBar style="auto" />
            <Button onPress={() => navigate('Tasks', { listId: 1 })} title='Tasks'/>
        </>
    );
};

Lists.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default Lists;
