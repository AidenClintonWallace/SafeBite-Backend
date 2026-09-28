/*Ricardo Mukwevho
Student Number: 222567023
 Login & Signup Screen*/

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log(isLogin ? 'Login:' : 'SignUp:', form);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>SafeBite</Text>
          
          {/* Logo Badge */}
          <View style={styles.logoBadge}>
            <Ionicons name="checkmark-circle-outline" size={54} color="#18794e" />
          </View>

          <Text style={styles.brandTagline}>eat safe, every day</Text>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.welcomeTitle}>Welcome to SafeBite</Text>

          {/* Toggle Tab */}
          <View style={styles.tabRow}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            {/* Email Field */}
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#a0aec0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              style={styles.input}
            />

            {/* Password Field */}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#a0aec0"
              secureTextEntry
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              style={styles.input}
            />

            {/* Log In Button */}
            <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit}>
              <Text style={styles.actionBtnText}>Log In</Text>
            </TouchableOpacity>

            {/* Sign Up Fields Section */}
            {!isLogin && (
              <View style={styles.signUpSection}>
                <Text style={styles.sectionHeader}>New to SafeBite?</Text>

                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor="#a0aec0"
                  value={form.fullName}
                  onChangeText={(text) => setForm({ ...form, fullName: text })}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Enter your phone number"
                  placeholderTextColor="#a0aec0"
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(text) => setForm({ ...form, phone: text })}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit}>
                  <Text style={styles.actionBtnText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18794e',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#18794e',
    alignItems: 'center',
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 25,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  logoBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  brandTagline: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    width: '90%',
    maxWidth: 420,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 35,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  tabTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  formGroup: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18794e',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f2f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    color: '#1a202c',
    marginBottom: 8,
  },
  actionBtn: {
    backgroundColor: '#18794e',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  signUpSection: {
    marginTop: 15,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
});