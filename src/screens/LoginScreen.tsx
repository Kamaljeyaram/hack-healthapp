import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Login: undefined;
  PatientList: undefined;
  PatientDashboard: { patientId: string };
  DoctorDashboard: undefined;
  Signup: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'doctor' | 'patient'>('doctor');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // In a real app, you would check the user type from your database
      // For this example, we'll use the selected user type
      if (userType === 'doctor') {
        navigation.navigate('DoctorDashboard');
      } else {
        navigation.navigate('PatientDashboard', { patientId: '1' });
      }
      
    } catch (error: any) {
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Invalid email or password');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address format');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Too many failed login attempts. Please try again later.');
      } else {
        Alert.alert('Error', error.message || 'Failed to sign in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to access your account</Text>
        </View>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'doctor' && styles.activeUserType
            ]}
            onPress={() => setUserType('doctor')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'doctor' && styles.activeUserTypeText
            ]}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'patient' && styles.activeUserType
            ]}
            onPress={() => setUserType('patient')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'patient' && styles.activeUserTypeText
            ]}>Patient</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
            darkMode={true}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
            darkMode={true}
          />
          <Button
            title="Login"
            onPress={handleLogin}
            disabled={isLoading}
            loading={isLoading}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}