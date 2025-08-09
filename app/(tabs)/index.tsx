import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Sparkles } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { calculateLifePathNumber } from '@/utils/numerology';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleCalculate = async () => {
    try {
      const lifePathNumber = calculateLifePathNumber(selectedDate);
      const userData = {
        dateOfBirth: selectedDate.toISOString(),
        lifePathNumber,
        calculatedAt: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('numerologyData', JSON.stringify(userData));
      router.push('/results');
    } catch (error) {
      Alert.alert('Error', 'Failed to calculate your numerology. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#374151', '#4B5563']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Sparkles size={48} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.title}>Discover Your Path</Text>
            <Text style={styles.subtitle}>
              Unlock the mysteries of your personality through numerology
            </Text>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Enter Your Date of Birth</Text>
            
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.dateButtonGradient}
              >
                <Calendar size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.dateButtonText}>
                  {formatDate(selectedDate)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {(showDatePicker || Platform.OS === 'ios') && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  themeVariant="dark"
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <LinearGradient
              colors={['#F59E0B', '#EAB308']}
              style={styles.calculateButtonGradient}
            >
              <Sparkles size={24} color="#1F2937" strokeWidth={2} />
              <Text style={styles.calculateButtonText}>Calculate My Number</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              Your Life Path Number reveals your natural talents, challenges, and the path you're meant to walk in this lifetime.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  datePickerContainer: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  doneButton: {
    alignSelf: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  calculateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calculateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  infoSection: {
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 20,
  },
});