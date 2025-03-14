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
      // Mock authentication instead of Firebase
      // In a real app, you would implement your own auth logic here
      
      // Simple validation for demo purposes
      if (email === 'doctor@example.com' && password === 'password') {
        // Navigate based on user type
        if (userType === 'doctor') {
          navigation.navigate('DoctorDashboard');
        } else {
          navigation.navigate('PatientDashboard', { patientId: '1' });
        }
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
      
    } catch (error: any) {
      Alert.alert('Error', 'Failed to sign in');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212' // Dark background
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Light text for dark background
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB' // Slightly dimmed text for subtitles
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  userTypeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333333', // Dark button background
    marginHorizontal: 5,
    alignItems: 'center'
  },
  activeUserType: {
    backgroundColor: '#1565C0' // Blue accent color for active state
  },
  userTypeText: {
    fontSize: 16,
    color: '#BBBBBB' // Light text
  },
  activeUserTypeText: {
    color: '#FFFFFF' // White text for active state
  },
  form: {
    marginBottom: 30
  },
  button: {
    marginTop: 20
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#BBBBBB', // Light gray text
    marginRight: 5
  },
  signupText: {
    color: '#64B5F6', // Light blue for links
    fontWeight: 'bold'
  }
});
