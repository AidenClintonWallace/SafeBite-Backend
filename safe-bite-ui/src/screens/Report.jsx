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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const REPORT_REASONS = [
  'Suspicious or altered expiry date',
  'Fake or counterfeit packaging',
  'Product smells or looks unsafe',
  'Other concern',
];

export default function ReportProductScreen() {
  const [productQuery, setProductQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleSubmit = () => {
    if (!productQuery.trim()) {
      Alert.alert('Required Field', 'Please provide a product name or barcode.');
      return;
    }

    Alert.alert(
      'Report Submitted',
      'Thank you for helping keep your community safe!',
      [
        {
          text: 'OK',
          onPress: () => {
            setProductQuery('');
            setAdditionalDetails('');
            setSelectedReason(REPORT_REASONS[0]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back-circle-outline" size={28} color="#15803d" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Screen Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Report a product</Text>
          <Text style={styles.subTitle}>Help keep your community safe</Text>
        </View>

        {/* Green Outer Card Wrapper */}
        <View style={styles.greenCardWrapper}>
          
          {/* Card 1: Product Name or Barcode */}
          <View style={styles.whiteCard}>
            <Text style={styles.cardTitle}>Product name or barcode</Text>
            <TextInput
              style={styles.textInputPill}
              placeholder=""
              placeholderTextColor="#9ca3af"
              value={productQuery}
              onChangeText={setProductQuery}
            />
          </View>

          {/* Card 2: Reason for Report (Radio Options) */}
          <View style={styles.whiteCard}>
            <Text style={styles.cardTitle}>Reason for report</Text>
            <View style={styles.radioGroup}>
              {REPORT_REASONS.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={styles.radioOption}
                    onPress={() => setSelectedReason(reason)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioDot,
                        { backgroundColor: isSelected ? '#15803d' : '#d1d5db' },
                      ]}
                    />
                    <Text style={styles.radioText}>{reason}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Card 3: Additional Details (Optional) */}
          <View style={styles.whiteCard}>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Additional details (optional)"
              placeholderTextColor="#9ca3af"
              value={additionalDetails}
              onChangeText={setAdditionalDetails}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Submit report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#15803d',
    marginLeft: 6,
  },
  headerContainer: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  subTitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  greenCardWrapper: {
    backgroundColor: '#15803d',
    borderRadius: 24,
    padding: 16,
    gap: 14,
  },
  whiteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  textInputPill: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    height: 38,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#1f2937',
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  radioText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  textAreaInput: {
    height: 90,
    fontSize: 12,
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#22c55e',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});