import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../views/main';
import Movies from '../views/movies';
import Upcoming from '../views/upcoming';
import TheatreDetail from '../views/theatreDetail';
import MovieDetail from '../views/MovieDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from '../slices/authSlice';
import { ActivityIndicator } from 'react-native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={Main}
                options={{ title: 'Theatres' }}
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
};

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
};
const UpcomingStack = () => {
    return (
        <Stack.Navigator initialRouteName="Movies">
            <Stack.Screen
                name="Upcoming Movies"
                component={Upcoming}
            />
        </Stack.Navigator>
    );
};
const Routes = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.token);
    useEffect(() => {
        dispatch(fetchAuth());
    }, [dispatch]);

    return (
        <>
            { isLoading
                ? <ActivityIndicator size="large" />
                : <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Home"
                            component={RootStack}
                            options={{ headerShown: false }}
                        />
                        <Tab.Screen
                            name="Movies"
                            component={MoviesStack}
                            options={{ headerShown: false }}
                        />
                        <Tab.Screen
                            name="Upcoming"
                            component={UpcomingStack}
                            options={{ headerShown: false }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            }
        </>
    );
};

export default Routes;
