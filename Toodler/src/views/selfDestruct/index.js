import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Button } from 'react-native-web';

const SelfDestruct = ({ route, navigation }) => {
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
            <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate('Boards');
                    }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        selfDestruct();
                        navigation.navigate('Boards');
                    }}>
                    <Text>DO IT!!!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

SelfDestruct.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        setOptions: PropTypes.func
    }).isRequired,
    route: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 40,
        maxHeight: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10
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
    }
});

export default SelfDestruct;
