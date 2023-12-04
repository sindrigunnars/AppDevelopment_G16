import React from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import TextButton from '../../components/TextButton';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
const Settings = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <TextButton text='Import Contacts' onPressFunc={() => fileService.importContacts()}/>
            </ScrollView>
        </SafeAreaView>
    );
};

Settings.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollContainer: {
        paddingHorizontal: 20
    }
});

export default Settings;
