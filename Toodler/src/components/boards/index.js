import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { DataContext } from '../data';
import ItemView from '../boardItem';

const Boards = () => {
    const { data } = useContext(DataContext);
    const navigation = useNavigation();
    navigation.removeListener();
    
    if (data.boards.length > 0) {
        return (
            <View style={styles.container}>
                { data.boards.map((item, key) => <ItemView key={key} item={item} navigation={navigation} lists={data.lists} />)}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>There are no boards</Text>
            </View>
        );
    }
};

export default Boards;

const styles = StyleSheet.create({
    container: {
        rowGap: 5
    }
});
