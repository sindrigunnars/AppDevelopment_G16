import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../views/main';
import Movies from '../views/movies';
import TheatreDetail from '../views/theatreDetail';
import MovieDetail from '../views/MovieDetail';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
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
            <Stack.Screen
                name="Movie"
                component={MovieDetail} />
        </Stack.Navigator>
    );
}

const MoviesStack = () => {
    return (
        <Stack.Navigator initialRouteName="Movies">
            <Stack.Screen
                name="All Movies"
                component={Movies}
            />
            <Stack.Screen
                name="Movie"
                component={MovieDetail} />
        </Stack.Navigator>
    );
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={RootStack} />
                <Tab.Screen
                    name="Movies"
                    component={MoviesStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
