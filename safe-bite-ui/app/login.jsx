/*Ricardo Mukwevho
Student Number: 222567023
 Login & Signup Screen*/

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../src/services/supabaseClient';

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAuthAction = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();

        if (error || !data) throw new Error('Invalid email or password');

        Alert.alert('Success', 'Logged in successfully!');
        router.replace('/(tabs)/dashboard');
      } else {
        // --- SIGN UP FLOW ---
        const { data, error } = await supabase
          .from('users')
          .insert([
            {
              email: email,
              password: password,
              first_name: firstName || 'User',
              phone_number: phoneNumber || '',
            },
          ])
          .select()
          .single();

        if (error) throw error;

        Alert.alert('Success', 'Account created successfully!');
        router.replace('/dashboard');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="check-bold" size={32} color="#0c7a43" />
          </View>
          <Text style={styles.headerTitle}>SafeBite</Text>
          <Text style={styles.headerSubtitle}>eat safe, every day</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.welcomeText}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </Text>

          {/* Tab Switcher */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={[styles.tabText, isLogin && styles.activeTab]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={[styles.tabText, !isLogin && styles.activeTab]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          {!isLogin && (
            <>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. John Doe"
                value={firstName}
                onChangeText={setFirstName}
              />
            </>
          )}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {!isLogin && (
            <>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </>
          )}

          {/* Submit Button with Loading Indicator */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuthAction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c7a43' },
  scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 13, color: '#e0e0e0', marginTop: 2 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 16 },
  tabContainer: { flexDirection: 'row', gap: 24, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 8 },
  tabText: { fontSize: 16, fontWeight: '600', color: '#888' },
  activeTab: { color: '#0c7a43', borderBottomWidth: 2, borderBottomColor: '#0c7a43', paddingBottom: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, backgroundColor: '#f9f9f9' },
  button: { backgroundColor: '#0c7a43', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});