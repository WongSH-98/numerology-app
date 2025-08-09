import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, Briefcase } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCompatibilityData } from '@/utils/numerology';

interface UserData {
  dateOfBirth: string;
  lifePathNumber: number;
  calculatedAt: string;
}

export default function CompatibilityScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [compatibilityData, setCompatibilityData] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('numerologyData');
      if (data) {
        const parsed = JSON.parse(data);
        setUserData(parsed);
        setCompatibilityData(getCompatibilityData(parsed.lifePathNumber));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  if (!userData || !compatibilityData) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1F2937', '#374151']} style={styles.gradient}>
          <View style={styles.centerContent}>
            <Heart size={48} color="#EC4899" strokeWidth={2} />
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
              <Heart size={48} color="#EC4899" strokeWidth={2} />
              <Text style={styles.title}>Compatibility & Relationships</Text>
              <Text style={styles.subtitle}>Life Path Number {userData.lifePathNumber}</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Heart size={24} color="#EC4899" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Romantic Compatibility</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardSubtitle}>Most Compatible With:</Text>
                <View style={styles.compatibilityGrid}>
                  {compatibilityData.romantic.compatible.map((num: number) => (
                    <View key={num} style={styles.compatibilityNumber}>
                      <Text style={styles.numberText}>{num}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.cardText}>{compatibilityData.romantic.description}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Users size={24} color="#10B981" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Friendship Circles</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{compatibilityData.friendship.description}</Text>
                <Text style={styles.cardSubtitle}>Best Friend Numbers:</Text>
                <View style={styles.compatibilityGrid}>
                  {compatibilityData.friendship.bestFriends.map((num: number) => (
                    <View key={num} style={[styles.compatibilityNumber, styles.friendNumber]}>
                      <Text style={styles.numberText}>{num}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Briefcase size={24} color="#F59E0B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Business Partnerships</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardText}>{compatibilityData.business.description}</Text>
                <Text style={styles.cardSubtitle}>Best Business Partners:</Text>
                <View style={styles.compatibilityGrid}>
                  {compatibilityData.business.partners.map((num: number) => (
                    <View key={num} style={[styles.compatibilityNumber, styles.businessNumber]}>
                      <Text style={styles.numberText}>{num}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>💡 Relationship Tips</Text>
                <Text style={styles.cardText}>{compatibilityData.tips}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#EC4899',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 12,
    marginTop: 16,
  },
  cardText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
    marginBottom: 8,
  },
  compatibilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  compatibilityNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EC4899',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendNumber: {
    backgroundColor: '#10B981',
  },
  businessNumber: {
    backgroundColor: '#F59E0B',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});