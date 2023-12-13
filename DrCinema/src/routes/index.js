import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../views/main';
import Movies from '../views/movies';
import Upcoming from '../views/upcoming';
import TheatreDetail from '../views/theatreDetail';
import MovieDetail from '../views/MovieDetail';
import UpcomingDetail from '../views/upcomingDetail';
import { fetchAuth } from '../slices/authSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        card: '#62b0ba',
        text: 'white',
        primary: 'white',
        background: '#f9f9f9',
        rawText: 'white'
    }
};

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
                name="Main"
                component={Main}
                options={{ title: 'Theaters' }}
            />
            <Stack.Screen
                name="Movies"
                component={Movies}
            />
            <Stack.Screen
                name="Theater"
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
            <Stack.Screen
                name="Upcoming Trailer"
                component={UpcomingDetail}
                options={({ route }) => ({ title: route.params.data.title })}
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
                : <NavigationContainer theme={CustomDarkTheme}>
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Theaters"
                            component={RootStack}
                            options={{ headerShown: false, tabBarActiveTintColor: '#e56441', tabBarInactiveTintColor: '#3c3c44' }}
                        />
                        <Tab.Screen
                            name="Movies"
                            component={MoviesStack}
                            options={{ headerShown: false, tabBarActiveTintColor: '#e56441', tabBarInactiveTintColor: '#3c3c44' }}
                        />
                        <Tab.Screen
                            name="Upcoming"
                            component={UpcomingStack}
                            options={{ headerShown: false, tabBarActiveTintColor: '#e56441', tabBarInactiveTintColor: '#3c3c44' }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            }
        </>
    );
};

export default Routes;
