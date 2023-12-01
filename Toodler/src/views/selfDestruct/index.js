import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../components/data';
import {
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native';
import styles from './styles';

const SelfDestruct = ({ navigation }) => {
    const { setData } = useContext(DataContext);

    const selfDestruct = () => {
        setData({
            boards: [],
            lists: [],
            tasks: []
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

export default SelfDestruct;
