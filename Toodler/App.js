import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppContainer from './src/routes';

export default function App () {
    return (
        <View style={styles.container}>
            <AppContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
