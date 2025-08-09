import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, LogIn, UserPlus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AuthLanding() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#374151', '#4B5563']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Sparkles size={64} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.title}>Numerology App</Text>
            <Text style={styles.subtitle}>
              Discover your life path and unlock the mysteries of your personality
            </Text>
          </View>

          <View style={styles.authSection}>
            <Text style={styles.sectionTitle}>Get Started</Text>
            <Text style={styles.sectionDescription}>
              Sign in to your account or create a new one to start your numerology journey
            </Text>

            <TouchableOpacity
              style={styles.authButton}
              onPress={() => router.push('/auth/login')}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.authButtonGradient}
              >
                <LogIn size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.authButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.authButton}
              onPress={() => router.push('/auth/signup')}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.authButtonGradient}
              >
                <UserPlus size={24} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.authButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your personal numerology insights await
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
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
  authSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  authButton: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  authButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
