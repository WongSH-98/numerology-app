import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, User, Briefcase, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNumerologyData } from '@/utils/numerology';
import { useAuth } from '@/contexts/AuthContext';
import { numerology } from '@/lib/supabase';

interface UserData {
  dateOfBirth: string;
  lifePathNumber: number;
  calculatedAt: string;
}

export default function ResultsScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [numerologyData, setNumerologyData] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      // Prefer fetching the latest saved calculation from Supabase if logged in
      if (user) {
        const { data, error } = await numerology.getUserCalculations(user.id);
        if (!error && data && data.length > 0) {
          const latest = data[0];
          const lifePath = latest.life_path_number as number;
          setUserData({
            dateOfBirth: latest.date_of_birth,
            lifePathNumber: lifePath,
            calculatedAt: latest.calculated_at,
          });
          setNumerologyData(getNumerologyData(lifePath));
          setAiSummary(latest.notes ?? null);
          return;
        }
      }

      // Fallback to local storage (legacy path)
      const dataStr = await AsyncStorage.getItem('numerologyData');
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        setUserData(parsed);
        setNumerologyData(getNumerologyData(parsed.lifePathNumber));
        setAiSummary(parsed.aiSummary ?? null);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  if (!userData || !numerologyData) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1F2937', '#374151']} style={styles.gradient}>
          <View style={styles.centerContent}>
            <Sparkles size={48} color="#6366F1" strokeWidth={2} />
            <Text style={styles.noDataText}>
              Please calculate your numerology first
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1F2937', '#374151']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.numberCircle}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.numberGradient}
                >
                  <Text style={styles.lifePathNumber}>
                    {userData.lifePathNumber}
                  </Text>
                </LinearGradient>
              </View>
              <Text style={styles.title}>Your Life Path Number</Text>
              <Text style={styles.subtitle}>{numerologyData.name}</Text>
            </View>

            {aiSummary ? (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Sparkles size={24} color="#F59E0B" strokeWidth={2} />
                  <Text style={styles.sectionTitle}>AI Summary</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardText}>{aiSummary}</Text>
                </View>
              </View>
            ) : null}

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <User size={24} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Your Characteristics</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{numerologyData.characteristics}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Star size={24} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Strengths</Text>
              </View>
              <View style={styles.card}>
                {numerologyData.strengths.map((strength: string, index: number) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.listText}>{strength}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Briefcase size={24} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Career Suggestions</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{numerologyData.careerSuggestions}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={24} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Life Purpose</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{numerologyData.lifePurpose}</Text>
              </View>
            </View>
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
  content: {
    padding: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  numberCircle: {
    borderRadius: 80,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  numberGradient: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lifePathNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F59E0B',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  cardText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginTop: 9,
  },
  listText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
    flex: 1,
  },
});