import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  temperature: number;
  waterLevel: number;
  diseaseStatus: string;
}

const DashboardStats: React.FC<Props> = ({ temperature, waterLevel, diseaseStatus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Text style={styles.label}>Temperature</Text>
        <Text style={styles.value}>{temperature}°C</Text>
        <View style={[styles.indicator, { backgroundColor: temperature > 28 ? '#ff6b6b' : '#4CAF50' }]} />
      </View>

      <View style={styles.statCard}>
        <Text style={styles.label}>Water Level</Text>
        <Text style={styles.value}>{waterLevel}%</Text>
        <View style={[styles.indicator, { backgroundColor: waterLevel < 70 ? '#ff6b6b' : '#2196F3' }]} />
      </View>

      <View style={[styles.statCard, styles.diseaseCard]}>
        <Text style={styles.label}>Fish Health</Text>
        <Text style={[
          styles.diseaseStatus,
          { color: diseaseStatus.includes('Warning') ? '#ff6b6b' : '#4CAF50' }
        ]}>
          {diseaseStatus}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
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
  diseaseCard: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  diseaseStatus: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicator: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
});

export default DashboardStats;