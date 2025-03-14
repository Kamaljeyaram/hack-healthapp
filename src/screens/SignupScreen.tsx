import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  PatientList: undefined;
  PatientDashboard: { patientId: string };
  DoctorDashboard: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function SignupScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Mock user creation instead of Firebase
      // In a real app, you would implement your own user creation logic here
      
      setIsLoading(false);
      
      // Navigate based on user type
      if (userType === 'doctor') {
        navigation.navigate('DoctorDashboard');
      } else {
        navigation.navigate('PatientDashboard', { patientId: '1' });
      }
      
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to create account');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our healthcare platform</Text>
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
          placeholder="Full Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
          darkMode={true}
          editable={!isLoading}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          darkMode={true}
          editable={!isLoading}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          darkMode={true}
          editable={!isLoading}
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          darkMode={true}
          editable={!isLoading}
        />
        <Button
          title="Sign Up"
          onPress={handleSignup}
          style={styles.button}
          loading={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#90CAF9',
    marginBottom: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  userTypeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  activeUserType: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  userTypeText: {
    color: '#BBBBBB',
    fontWeight: 'bold',
  },
  activeUserTypeText: {
    color: '#FFFFFF',
  },
  form: {
    padding: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1976D2',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    color: '#BBBBBB',
    marginRight: 5,
  },
  loginText: {
    color: '#64B5F6',
    fontWeight: 'bold',
  },
});