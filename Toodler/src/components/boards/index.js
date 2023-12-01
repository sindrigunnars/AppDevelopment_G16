import React, { useContext, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { DataContext } from '../data';
import ItemView from '../boardItem';
import RadioGroup from 'react-native-radio-buttons-group';

const Boards = () => {
    const { data } = useContext(DataContext);
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState();
    navigation.removeListener();

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Default ',
            value: 'default',
            selected: true
        },
        {
            id: '2',
            label: 'Alphabetical',
            value: 'alphabetical'
        }
    ]), []);

    if (data.boards.length > 0) {
        let boards = data.boards;
        if (selectedId === '1') {
            boards = [...data.boards].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            boards = data.boards;
        }
        return (
            <View style={styles.container}>
                <View style={styles.radioGroup}>
                    <Text>Sort Boards</Text>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId || '1'}
                        layout='row'
                    />
                </View>
                { boards.map((item, key) => <ItemView key={key} item={item} navigation={navigation} lists={data.lists} imageSourceProp={{ uri: item.thumbnailPhoto }} />)}
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
        rowGap: 20
    }
});
