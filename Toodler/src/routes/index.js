import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../views/main';
import Lists from '../views/lists';
import Tasks from '../views/tasks';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Lists" component={Lists} />
            <Stack.Screen name="Tasks" component={Tasks} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
