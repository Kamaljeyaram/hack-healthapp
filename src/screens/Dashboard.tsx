import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, Animated } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

import DashboardStats from '../components/DashboardStats';

type RootStackParamList = {
  Dashboard: {
    farmId: string;
  };
};

type DashboardScreenProps = {
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

// Generate random data between min and max
const generateRandomData = (min: number, max: number, count: number) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
};

export default function Dashboard({ route, navigation }: DashboardScreenProps) {
  const [tempHistory, setTempHistory] = useState<number[]>([]);
  const [waterHistory, setWaterHistory] = useState<number[]>([]);
  const [currentTemp, setCurrentTemp] = useState(25);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(75);
  const [diseaseDetected, setDiseaseDetected] = useState(false);

  useEffect(() => {
    // Generate initial historical data
    setTempHistory(generateRandomData(20, 30, 7));
    setWaterHistory(generateRandomData(60, 90, 7));

    // Update data every 5 seconds
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * (30 - 20 + 1) + 20);
      const newWaterLevel = Math.floor(Math.random() * (90 - 60 + 1) + 60);

      setCurrentTemp(newTemp);
      setCurrentWaterLevel(newWaterLevel);
      setDiseaseDetected(Math.random() > 0.8); // 20% chance of disease detection

      setTempHistory(prev => [...prev.slice(1), newTemp]);
      setWaterHistory(prev => [...prev.slice(1), newWaterLevel]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <DashboardStats
          temperature={currentTemp}
          waterLevel={currentWaterLevel}
          diseaseStatus={diseaseDetected ? 'Warning: Disease Detected!' : 'All Fish are Healthy'}
        />

        <View style={styles.statContainer}>
          <Text style={styles.sectionTitle}>Temperature History</Text>
          <View style={styles.historyContainer}>
            {tempHistory.map((temp, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={[styles.tempBar, { height: `${(temp / 40) * 100}%` }]}>
                  <Text style={styles.tempText}>{temp}°C</Text>
                </View>
                <Text style={styles.dayText}>
                  {index === tempHistory.length - 1 ? 'Now' : `${6-index}d`}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.sectionTitle}>Water Level History</Text>
          <View style={styles.historyContainer}>
            {waterHistory.map((level, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={[styles.waterBar, { height: `${level}%` }]}>
                  <Text style={styles.waterText}>{level}%</Text>
                </View>
                <Text style={styles.dayText}>
                  {index === waterHistory.length - 1 ? 'Now' : `${6-index}d`}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    padding: 16,
  },
  statContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  historyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  historyItem: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  tempBar: {
    width: 30,
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 40,
  },
  waterBar: {
    width: 30,
    backgroundColor: '#1976D2',
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 40,
  },
  tempText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  waterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dayText: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
});