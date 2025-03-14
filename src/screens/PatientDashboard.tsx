import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  PatientList: undefined;
  PatientDashboard: { patientId: string };
};

type PatientDashboardRouteProp = RouteProp<RootStackParamList, 'PatientDashboard'>;

type Props = {
  route: PatientDashboardRouteProp;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

// Mock patient data
const patientData = {
  id: '1',
  name: 'John Smith',
  age: 45,
  gender: 'Male',
  bloodType: 'O+',
  condition: 'Post-surgery recovery',
  roomNumber: '301',
  admissionDate: '15 May 2023',
  doctor: 'Dr. Sarah Wilson',
  imageUrl: require('../../assets/patient1.png'),
  status: 'stable',
  vitalSigns: {
    heartRate: {
      current: 72,
      data: [68, 70, 72, 71, 73, 72],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    bloodPressure: {
      current: '120/80',
      data: [120, 118, 122, 119, 121, 120],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    temperature: {
      current: 36.8,
      data: [36.6, 36.7, 36.9, 36.8, 36.7, 36.8],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    oxygenSaturation: {
      current: 98,
      data: [97, 98, 98, 99, 98, 98],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  medications: [
    { name: 'Amoxicillin', dosage: '500mg', frequency: 'Every 8 hours' },
    { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain' },
    { name: 'Loratadine', dosage: '10mg', frequency: 'Once daily' }
  ],
  upcomingAppointments: [
    { type: 'Blood Test', date: 'Tomorrow, 10:00 AM' },
    { type: 'Physical Therapy', date: 'Wednesday, 2:00 PM' },
    { type: 'Doctor Checkup', date: 'Friday, 11:30 AM' }
  ]
};

export default function PatientDashboard({ route, navigation }: Props) {
  // Add a default value if route.params is undefined
  const { patientId = '1' } = route?.params || {};
  
  // In a real app, you would fetch the patient data based on the ID
  // For this example, we'll use the mock data

  const chartConfig = {
    backgroundGradientFrom: '#1E1E1E',
    backgroundGradientTo: '#1E1E1E',
    color: (opacity = 1) => `rgba(100, 181, 246, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.patientInfoContainer}>
          <Image source={patientData.imageUrl} style={styles.patientImage} />
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{patientData.name}</Text>
            <Text style={styles.patientDetails}>
              {patientData.age} years • {patientData.gender} • Room {patientData.roomNumber}
            </Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.statusText}>{patientData.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vital Signs</Text>
        <View style={styles.vitalSignsContainer}>
          <View style={styles.vitalSign}>
            <Icon name="heart-pulse" size={24} color="#F44336" />
            <Text style={styles.vitalValue}>{patientData.vitalSigns.heartRate.current}</Text>
            <Text style={styles.vitalLabel}>Heart Rate</Text>
          </View>
          <View style={styles.vitalSign}>
            <Icon name="blood-bag" size={24} color="#2196F3" />
            <Text style={styles.vitalValue}>{patientData.vitalSigns.bloodPressure.current}</Text>
            <Text style={styles.vitalLabel}>Blood Pressure</Text>
          </View>
          <View style={styles.vitalSign}>
            <Icon name="thermometer" size={24} color="#FF9800" />
            <Text style={styles.vitalValue}>{patientData.vitalSigns.temperature.current}°C</Text>
            <Text style={styles.vitalLabel}>Temperature</Text>
          </View>
          <View style={styles.vitalSign}>
            <Icon name="lungs" size={24} color="#4CAF50" />
            <Text style={styles.vitalValue}>{patientData.vitalSigns.oxygenSaturation.current}%</Text>
            <Text style={styles.vitalLabel}>O₂ Saturation</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart Rate Trend</Text>
        <LineChart
          data={{
            labels: patientData.vitalSigns.heartRate.labels,
            datasets: [
              {
                data: patientData.vitalSigns.heartRate.data,
                color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
                strokeWidth: 2
              }
            ]
          }}
          width={width - 32}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medications</Text>
        {patientData.medications.map((medication, index) => (
          <View key={index} style={styles.medicationItem}>
            <View style={styles.medicationIcon}>
              <Icon name="pill" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDetails}>
                {medication.dosage} • {medication.frequency}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {patientData.upcomingAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <View style={styles.appointmentIcon}>
              <Icon name="calendar-clock" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
              <Text style={styles.appointmentDate}>{appointment.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Blood Type:</Text>
          <Text style={styles.infoValue}>{patientData.bloodType}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Condition:</Text>
          <Text style={styles.infoValue}>{patientData.condition}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Admission Date:</Text>
          <Text style={styles.infoValue}>{patientData.admissionDate}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Primary Doctor:</Text>
          <Text style={styles.infoValue}>{patientData.doctor}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-text-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="phone" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="file-document-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Records</Text>
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
    backgroundColor: '#1565C0',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  patientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#E1F5FE',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  vitalSignsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  vitalSign: {
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  vitalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#BBBBBB',
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  appointmentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7E57C2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    width: 120,
    fontSize: 14,
    color: '#BBBBBB',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    width: width * 0.25,
  },
  actionButtonText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
  },
});