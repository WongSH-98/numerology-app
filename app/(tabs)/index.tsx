import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Sparkles, LogOut } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { router } from 'expo-router';
import { calculateLifePathNumber } from '@/utils/numerology';
import { useAuth } from '@/contexts/AuthContext';
import { numerology } from '@/lib/supabase';
import { generateNumerology } from '@/lib/ai';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user, signOut } = useAuth();

  console.log('HomeScreen: Current user:', user ? user.email : 'none');

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // The AuthContext will automatically redirect to auth screens
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleCalculate = async () => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please sign in to save your numerology calculations.');
      router.push('/auth/login');
      return;
    }

    try {
      const dobStr = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

      // Call AI numerology (Edge Function backed by OpenAI). Continue gracefully if it fails.
      const ai = await generateNumerology(dobStr);
      if (!ai) {
        console.warn('AI numerology unavailable, falling back to local life path only');
      }

      // Fallback in case AI fails to provide life_path_number
      const lifePathNumber = ai?.life_path_number ?? calculateLifePathNumber(selectedDate);

      const calculationData: any = {
        user_id: user.id,
        date_of_birth: dobStr,
        life_path_number: lifePathNumber,
        birth_day_number: ai?.birth_day_number ?? null,
        expression_number: ai?.expression_number ?? null,
        soul_urge_number: ai?.soul_urge_number ?? null,
        personality_number: ai?.personality_number ?? null,
        notes: ai?.summary ?? null,
        calculated_at: new Date().toISOString(),
      };

      const { error } = await numerology.saveCalculation(calculationData);
      if (error) {
        console.error('Error saving calculation:', error);
        Alert.alert('Error', 'Failed to save your calculation. Please try again.');
        return;
      }

      // Persist locally for the results screen fallback/offline
      await AsyncStorage.setItem(
        'numerologyData',
        JSON.stringify({
          dateOfBirth: dobStr,
          lifePathNumber,
          calculatedAt: calculationData.calculated_at,
          aiSummary: calculationData.notes ?? null,
        })
      );

      if (!ai) {
        Alert.alert('AI Unavailable', 'Generated your Life Path Number locally. AI insights will appear when available.');
      }

      router.push('/results');
    } catch (error: any) {
      console.error('Error calculating numerology:', error);
      Alert.alert('Error', error?.message || 'Failed to calculate your numerology. Please try again.');
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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Sparkles size={48} color="#F59E0B" strokeWidth={2} />
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <LogOut size={24} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Discover Your Path</Text>
            <Text style={styles.subtitle}>
              Unlock the mysteries of your personality through numerology
            </Text>
            {user && (
              <Text style={styles.userInfo}>Welcome, {user.email}</Text>
            )}
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
              Your Life Path Number reveals your natural talents, challenges, and the path you&apos;re meant to walk in this lifetime.
            </Text>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  logoutButton: {
    padding: 8,
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
  userInfo: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 16,
    textAlign: 'center',
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginTop: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 20,
  },
});