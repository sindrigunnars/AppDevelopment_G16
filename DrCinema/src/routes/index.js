import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../views/main';
import Movies from '../views/movies';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
            />
            <Stack.Screen
                name="Movies"
                component={Movies}
            />
        </Stack.Navigator>
    );
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Main">
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                />
                <Tab.Screen
                    name="Movies"
                    component={Movies}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
