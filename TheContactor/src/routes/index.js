import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../views/Main';
import Contact from '../views/Contact';
import Settings from '../views/Settings';
import HeaderButton from '../components/HeaderButton';
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Contacts"
                    component={Contacts}
                    options={({ navigation }) => ({
                        title: 'Contacts',
                        headerLeft: () => (
                            <HeaderButton name={'settings-outline'} onPressFunc={() => navigation.navigate('Settings')} />
                        )
                    })}
                />
                <Stack.Screen
                    name="Contact"
                    component={Contact}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <HeaderButton name={'chevron-back'} onPressFunc={() => navigation.goBack()} />
                        )
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <HeaderButton name={'chevron-back'} onPressFunc={() => navigation.goBack()} />
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
