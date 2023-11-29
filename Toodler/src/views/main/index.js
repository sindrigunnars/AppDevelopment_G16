import React from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Main = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
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
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
});

export default Main;
