import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, ScrollView, Text } from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Hello Dr. Cinema</Text>
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
