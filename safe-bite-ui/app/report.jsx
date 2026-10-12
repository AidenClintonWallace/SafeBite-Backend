/*Olwethu Mtwazi
Student Number: 230036937
 Report Screen*/

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
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../src/services/supabaseClient';
import { getCurrentUser } from '../src/services/session';
import { colors } from '../src/theme';

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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!productQuery.trim()) {
      Alert.alert('Required Field', 'Please provide a product name or barcode.');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      Alert.alert('Please log in again', 'You need to be logged in to submit a report.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('report').insert([
        {
          user_id: user.user_id,
          product_query: productQuery.trim(),
          reason: selectedReason,
          details: additionalDetails.trim() || null,
        },
      ]);

      if (error) throw error;

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
    } catch (err) {
      Alert.alert('Could not submit report', err.message || 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.intro}>
          Help keep your community safe by telling us about a product that doesn't look right.
        </Text>

        {/* Card 1: Product Name or Barcode */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Product name or barcode</Text>
          <TextInput
            style={styles.textInputPill}
            placeholder="e.g. Lucky Star Pilchards or 6001007051044"
            placeholderTextColor="#9ca3af"
            value={productQuery}
            onChangeText={setProductQuery}
          />
        </View>

        {/* Card 2: Reason for Report */}
        <View style={styles.card}>
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
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={[styles.radioRing, isSelected && styles.radioRingSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>{reason}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Card 3: Additional Details (Optional) */}
        <View style={styles.card}>
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

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, submitting && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.85}
        >
          {submitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit report</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  textInputPill: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.text,
  },
  radioGroup: {
    gap: 14,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioRingSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  textAreaInput: {
    height: 90,
    fontSize: 14,
    color: colors.text,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});