import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type Farm = {
  id: string;
  name: string;
  location: string;
  temperature: number;
  waterLevel: number;
  imageUrl: number;
};

const mockFarms: Farm[] = [
  {
    id: '1',
    name: 'Green Aqua Farm',
    location: 'Chennai',
    temperature: 25.5,
    waterLevel: 80,
    imageUrl: require('../../assets/farm1.png'),
  },
  {
    id: '2',
    name: 'Blue Waters Farm',
    location: 'Bangalore',
    temperature: 24.8,
    waterLevel: 75,
    imageUrl: require('../../assets/farm2.png'),
  },
  {
    id: '3',
    name: 'Aqua Life Center',
    location: 'Mumbai',
    temperature: 26.2,
    waterLevel: 85,
    imageUrl: require('../../assets/farm3.png'),
  },
];

type RootStackParamList = {
  FarmList: undefined;
  Dashboard: { farmId: string };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function FarmListScreen({ navigation }: Props) {
  const renderFarmCard = ({ item }: { item: Farm }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Dashboard', { farmId: item.id })}>
      <Image source={item.imageUrl} style={styles.farmImage} />
      <View style={styles.cardContent}>
        <Text style={styles.farmName}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Temperature</Text>
            <Text style={styles.statValue}>{item.temperature}°C</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Water Level</Text>
            <Text style={styles.statValue}>{item.waterLevel}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Farms</Text>
      </View>
      <FlatList
        data={mockFarms}
        renderItem={renderFarmCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  farmImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  farmName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#558B2F',
  },
});
