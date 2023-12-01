import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SelfDestruct = ({ navigation }) => {
    const { data, setData } = useContext(DataContext);

    const selfDestruct = () => {
        setData({
            ...data,
            tasks: [],
            lists: [],
            boards: []
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate('Boards');
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]}
                    onPress={() => {
                        selfDestruct();
                        navigation.navigate('Boards');
                    }}>
                    <Text style={styles.textStyle}>DO IT!!!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

SelfDestruct.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 10,
        rowGap: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    redButton: {
        backgroundColor: 'red'
    }
});

export default SelfDestruct;
