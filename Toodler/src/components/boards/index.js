import React, { useContext } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { DataContext } from '../data';
import ItemView from '../boardItem';

const Boards = () => {
    const { data } = useContext(DataContext);
    if (data.boards.length > 0) {
        const navigation = useNavigation();
        navigation.removeListener();
        return (
            <View style={{ rowGap: 10 }}>
                { data.boards.map((item, key) => <ItemView key={key} item={item} navigation={navigation} lists={data.lists} />)}
            </View>
        );
    } else {
        return (
            <View style={{ rowGap: 10 }}>
                <Text style={{ color: useTheme().colors.rawText }}>There are no boards</Text>
            </View>
        );
    }
};

export default Boards;
