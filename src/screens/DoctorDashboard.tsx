import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
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

// Mock patients data with images
const patients = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    age: 42,
    status: 'stable', 
    condition: 'Hypertension',
    roomNumber: '301',
    lastCheckup: '2 days ago',
    imageUrl: require('../../assets/patient1.png') 
  },
  { 
    id: '2', 
    name: 'Mike Peters', 
    age: 58,
    status: 'critical', 
    condition: 'Post-surgery recovery',
    roomNumber: '205',
    lastCheckup: 'Today',
    imageUrl: require('../../assets/patient2.png') 
  },
  { 
    id: '3', 
    name: 'Emma Wilson', 
    age: 35,
    status: 'improving', 
    condition: 'Pneumonia',
    roomNumber: '118',
    lastCheckup: 'Yesterday',
    imageUrl: require('../../assets/patient3.png') 
  },
  { 
    id: '4', 
    name: 'Robert Chen', 
    age: 67,
    status: 'stable', 
    condition: 'Diabetes',
    roomNumber: '422',
    lastCheckup: '3 days ago',
    imageUrl: require('../../assets/patient4.png') 
  },
];

export default function DoctorDashboard({ navigation }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return '#4CAF50';
      case 'improving': return '#2196F3';
      case 'critical': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const renderPatientCard = ({ item }: { item: typeof patients[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PatientDashboard', { patientId: item.id })}>
      <View style={styles.cardHeader}>
        <Image source={item.imageUrl} style={styles.patientImage} />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientDetails}>Age: {item.age} • Room: {item.roomNumber}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Icon name="medical-bag" size={18} color="#90CAF9" />
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={18} color="#90CAF9" />
          <Text style={styles.checkupText}>Last checkup: {item.lastCheckup}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Patients</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-variant" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={patients}
        renderItem={renderPatientCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  patientImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  patientInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  conditionText: {
    color: '#FFFFFF',
    marginLeft: 8,
  },
  checkupText: {
    color: '#BBBBBB',
    marginLeft: 8,
  },
});