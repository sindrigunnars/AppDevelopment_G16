import React from 'react';
import PropTypes from 'prop-types';
import Boards from '../../components/boards';
import {
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Text,
    StatusBar
} from 'react-native';
import styles from './styles';

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

export default Main;
