import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../views/main';
import HeaderButton from '../components/HeaderButton';
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={({ navigation }) => ({
                        title: 'Contacts',
                        headerLeft: () => (
                            <HeaderButton name={'settings-outline'} onPressFunc={() => navigation.navigate('Main')} />
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
