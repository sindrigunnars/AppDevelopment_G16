import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../views/main';
import Movies from '../views/movies';
import TheatreDetail from '../views/theatreDetail';
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Theatres"
                    component={Main}
                />
                <Stack.Screen
                    name="Movies"
                    component={Movies}
                />
                <Stack.Screen
                    name="Theatre"
                    component={TheatreDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
