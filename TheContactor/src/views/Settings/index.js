import React from 'react';
import PropTypes from 'prop-types';
import * as fileService from '../../services/fileService';
import TextButton from '../../components/TextButton';
import { SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';

const Settings = ({ navigation: { goBack } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <TextButton style={{ marginTop: 16 }} text='Import Contacts' onPressFunc={async () => {
                    await fileService.importContacts();
                    goBack();
                }}/>
            </ScrollView>
        </SafeAreaView>
    );
};

Settings.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }).isRequired
};

export default Settings;
