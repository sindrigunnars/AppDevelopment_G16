import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Boards from '../views/main';
import Lists from '../views/lists';
import Tasks from '../views/tasks';
import ModifyBoard from '../views/modifyBoard';
import ModifyTask from '../views/modifyTask';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Boards" component={Boards} />
            <Stack.Screen name="Edit Board" component={ModifyBoard} />
            <Stack.Screen name="Lists" component={Lists} />
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="Edit Task" component={ModifyTask} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
