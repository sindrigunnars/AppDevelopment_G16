import React, { useContext, useState, useMemo } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { DataContext } from '../data';
import ItemView from '../boardItem';
import styles from './styles';
import RadioGroup from 'react-native-radio-buttons-group';

const Boards = () => {
    const { data } = useContext(DataContext);
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState();
    const theme = useTheme();
    const radioColor = theme.colors.rawText;

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Default',
            value: 'default',
            selected: true,
            color: radioColor,
            labelStyle: { color: radioColor }

        },
        {
            id: '2',
            label: 'Alphabetical',
            value: 'alphabetical',
            color: radioColor,
            labelStyle: { color: radioColor }
        }
    ]), [theme]);

    if (data.boards.length > 0) {
        const boards = (selectedId === '2') ? [...data.boards].sort((a, b) => a.name.localeCompare(b.name)) : data.boards;
        return (
            <View style={styles.container}>
                <View style={styles.radio}>
                    <View style={styles.titleContainer}>
                        <Text style={{ ...styles.title, color: theme.colors.rawText }}>Order</Text>
                    </View>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={setSelectedId}
                        selectedId={selectedId || '1'}
                        layout='row'
                        containerStyle={{ justifyContent: 'center' }}
                    />
                </View>
                { boards.map((item, key) => <ItemView key={key} item={item} navigation={navigation} lists={data.lists} imageSourceProp={{ uri: item.thumbnailPhoto }} />)}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={{ color: theme.colors.rawText }}>There are no boards</Text>
            </View>
        );
    }
};

export default Boards;
