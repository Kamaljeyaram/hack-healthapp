import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  FarmList: undefined;
  Dashboard: {
    farmId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import AnimatedSplash from '../components/AnimatedSplash';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FarmListScreen from '../screens/FarmListScreen';
import Dashboard from '../screens/Dashboard';

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2E7D32',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Splash"
                    component={AnimatedSplash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FarmList"
                    component={FarmListScreen}
                    options={{ headerTitle: 'My Farms' }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerTitle: 'Farm Dashboard' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}