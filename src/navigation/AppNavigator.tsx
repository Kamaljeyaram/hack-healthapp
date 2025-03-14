import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  PatientList: undefined;
  PatientDashboard: {
    patientId: string;
  };
  DoctorDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import AnimatedSplash from '../components/AnimatedSplash';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PatientListScreen from '../screens/PatientListScreen';
import PatientDashboard from '../screens/PatientDashboard';
import DoctorDashboard from '../screens/DoctorDashboard';

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1565C0',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    contentStyle: {
                        backgroundColor: '#121212',
                    }
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
                    name="PatientList"
                    component={PatientListScreen}
                    options={{ headerTitle: 'My Patients' }}
                />
                <Stack.Screen
                    name="PatientDashboard"
                    component={PatientDashboard}
                    options={{ headerTitle: 'Patient Details' }}
                />
                <Stack.Screen
                    name="DoctorDashboard"
                    component={DoctorDashboard}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}