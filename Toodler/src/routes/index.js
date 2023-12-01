import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Boards from '../views/main';
import Lists from '../views/lists';
import ModifyBoard from '../views/modifyBoard';
import ModifyTask from '../views/modifyTask';
import ModifyList from '../views/modifyList';
import SelfDestruct from '../views/selfDestruct';
import { Switch } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#010659',
        text: 'white',
        primary: 'white',
        background: '#f2f2f2',
        rawText: 'black'
    }
};

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        card: '#010659',
        text: 'white',
        primary: 'white',
        background: '#242526',
        rawText: 'white'
    }
};

const switchButton = ({ scheme, setScheme }) => {
    const toggleSwitch = () => setScheme(!scheme);
    return (
        <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={scheme ? '#242526' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={scheme}
            style={{ marginRight: 10, marginBottom: 10 }}
        />
    );
};

const Routes = () => {
    const [scheme, setScheme] = useState(true);
    return (
        <NavigationContainer theme={scheme ? CustomLightTheme : CustomDarkTheme}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Boards"
                    component={Boards}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
                <Stack.Screen
                    name="Edit Board"
                    component={ModifyBoard}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
                <Stack.Screen
                    name="Lists"
                    component={Lists}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
                <Stack.Screen
                    name="Edit Task"
                    component={ModifyTask}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
                <Stack.Screen
                    name="Edit List"
                    component={ModifyList}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
                <Stack.Screen
                    name="Self-destruct"
                    component={SelfDestruct}
                    options={{ headerRight: () => switchButton({ scheme, setScheme }) }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
