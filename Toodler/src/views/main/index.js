import React from 'react';
import PropTypes from 'prop-types';
import { Button, StatusBar, Text } from 'react-native';

const Main = ({ navigation: { navigate } }) => (
    <>
        <Text>Welcome to the main screen (BOARDS)</Text>
        <StatusBar style="auto" />
        <Button onPress={() => navigate('Lists', { boardId: 1 })} title='Lists'/>
    </>
);

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

export default Main;
