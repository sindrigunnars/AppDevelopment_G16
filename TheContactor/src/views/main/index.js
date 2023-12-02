import React from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Text } from 'react-native';

const Contacts = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"
                    barStyle={'dark-content'}
                    showHideTransition={'fade'}
                    hidden={false}
                />
                <Text>{fileService.getDir()}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

Contacts.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Contacts;
