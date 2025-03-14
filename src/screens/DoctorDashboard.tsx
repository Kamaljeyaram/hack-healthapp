import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  DoctorDashboard: undefined;
  PatientList: undefined;
  PatientDashboard: { patientId: string };
  Login: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Mock critical alerts data
const criticalAlerts = [
  { id: '1', name: 'John Doe', issue: 'High blood pressure', timeAgo: '10 mins ago' },
  { id: '2', name: 'Jane Smith', issue: 'Irregular heart rate', timeAgo: '25 mins ago' },
];

// Mock active patients data
const activePatients = [
  { id: '1', name: 'Sarah Johnson', status: 'stable', color: '#4CAF50' },
  { id: '2', name: 'Mike Peters', status: 'critical', color: '#F44336' },
  { id: '3', name: 'Emma Wilson', status: 'improving', color: '#FFC107' },
];

export default function DoctorDashboard({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => {}}
        >
          <Text style={styles.navButtonText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('PatientList')}
        >
          <Text style={styles.navButtonText}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => {}}
        >
          <Text style={styles.navButtonText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Doctor Dashboard</Text>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Patients</Text>
            <Text style={styles.statValue}>24</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending Consultations</Text>
            <Text style={styles.statValue}>8</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Critical Cases</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Today's Appointments</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>

        {/* Critical Patient Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Critical Patient Alerts</Text>
          
          {criticalAlerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <Text style={styles.patientName}>{alert.name}</Text>
              <Text style={styles.alertIssue}>{alert.issue}</Text>
              <Text style={styles.alertTime}>{alert.timeAgo}</Text>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => navigation.navigate('PatientDashboard', { patientId: alert.id })}
              >
                <Text style={styles.viewButtonText}>View Patient</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Active Patients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Patients</Text>
          
          <View style={styles.patientsGrid}>
            {activePatients.map((patient) => (
              <TouchableOpacity 
                key={patient.id} 
                style={styles.patientCard}
                onPress={() => navigation.navigate('PatientDashboard', { patientId: patient.id })}
              >
                <View style={[styles.statusDot, { backgroundColor: patient.color }]} />
                <Text style={styles.patientCardName}>{patient.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  activeNavButton: {
    backgroundColor: '#5C6BC0',
    borderRadius: 4,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  logoutButton: {
    marginLeft: 'auto',
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5C6BC0',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statLabel: {
    color: '#5C6BC0',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  patientName: {
    color: '#5C6BC0',
    fontWeight: 'bold',
    width: '25%',
  },
  alertIssue: {
    color: '#F44336',
    width: '25%',
  },
  alertTime: {
    color: '#BBBBBB',
    width: '20%',
  },
  viewButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  patientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  patientCard: {
    width: '32%',
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  patientCardName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
});