import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Boards from '../views/main';
import Lists from '../views/lists';
import ModifyBoard from '../views/modifyBoard';
import ModifyTask from '../views/modifyTask';
import ModifyList from '../views/modifyList';

const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#010659',
        text: 'white',
        primary: 'white',
        background: '#f2f2f2'
    }
};

const Routes = () => (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Boards" component={Boards} />
            <Stack.Screen name="Edit Board" component={ModifyBoard} />
            <Stack.Screen name="Lists" component={Lists} />
            <Stack.Screen name="Edit Task" component={ModifyTask} />
            <Stack.Screen name="Edit List" component={ModifyList} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
