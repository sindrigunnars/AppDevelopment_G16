import React from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'light-content'}
                showHideTransition={'fade'}
                hidden={false}
            />
            <ScrollView bounces={true} contentContainerStyle={styles.container}>
                <Boards />
                <TouchableOpacity style={styles.button}
                    onPress={() => navigate('Edit Board', { modify: false })}>
                    <Text style={styles.buttonText}>Add Board</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]}
                    onPress={() => navigate('Self-destruct')}>
                    <Text style={styles.buttonText}>SELF-DESTRUCT</Text>
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
        rowGap: 20,
        paddingVertical: 25
    },
    button: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '90%',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
        redButton: {
        backgroundColor: 'red'
    }
});

export default Main;
