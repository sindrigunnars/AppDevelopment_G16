import React from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
                showHideTransition={'fade'}
                hidden={false}
            />
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
                <Boards />
                <TouchableOpacity style={styles.button}
                    onPress={() => navigate('Edit Board', { modify: false })}>
                    <Text>Add Board</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

Main.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 10,
        paddingVertical: 20
    },
    button: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: '95%',
        borderColor: 'black',
        borderWidth: 1
    }
});

export default Main;
