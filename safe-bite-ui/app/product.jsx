/*Sylvia Mahlangu
Student Number: 222954396
 Product Screen*/

 import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../src/services/supabaseClient';
import { getCurrentUser } from '../src/services/session';
import { colors, status } from '../src/theme';

// Quick picks for the expiry date (the date printed on the pack is always better)
const QUICK_PICKS = [
  { label: 'In 3 days', days: 3 },
  { label: 'In 1 week', days: 7 },
  { label: 'In 2 weeks', days: 14 },
  { label: 'In 1 month', days: 30 },
];

const pad = (n) => String(n).padStart(2, '0');

// Date -> "2026-10-12" (what the database stores), using the phone's local date
const toISODate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Date -> "12/10/2026" (what the user types and sees)
const toDisplayDate = (date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

const dateFromToday = (days) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
};

// Keeps only digits and adds the slashes as the user types: 12102026 -> 12/10/2026
const formatDateInput = (text) => {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join('/');
};

// "12/10/2026" -> Date, or null if it isn't a real date
const parseDisplayDate = (text) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  const isReal =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isReal ? date : null;
};

const daysUntil = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((date - today) / (1000 * 60 * 60 * 24));
};

// Same wording and colours as the dashboard and notifications
const describeDays = (days) => {
  if (days < 0) {
    return {
      text: `Expired ${-days} day${days === -1 ? '' : 's'} ago`,
      tone: status.expired,
    };
  }
  if (days === 0) return { text: 'Expires today', tone: status.soon };
  if (days === 1) return { text: 'Expires tomorrow', tone: status.soon };
  return {
    text: `Expires in ${days} days`,
    tone: days <= 3 ? status.soon : status.safe,
  };
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Accept passed parameters from Expo Router
  const productId = params?.productId;
  const scannedFood = params?.food ? JSON.parse(params.food) : null;

  const [product, setProduct] = useState(scannedFood || null);
  const [loading, setLoading] = useState(!scannedFood);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [imageFailed, setImageFailed] = useState(false);
  const [dateText, setDateText] = useState('');
  const [saving, setSaving] = useState(false);

  const parsedDate = parseDisplayDate(dateText);
  const dateInfo = parsedDate ? describeDays(daysUntil(parsedDate)) : null;

  useEffect(() => {
    if (scannedFood) return;
    if (!productId) {
      setError('No product selected');
      setLoading(false);
      return;
    }
    fetchProductFromSupabase();
  }, [productId]);

  const fetchProductFromSupabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('food_product')
        .select('*')
        .eq('product_id', productId)
        .single();

      if (fetchErr) throw fetchErr;
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const addToPantry = async (expiry) => {
    setSaving(true);
    setMessage('');
    try {
      const user = getCurrentUser();
      if (!user) {
        setMessage('❌ Please log in again to add items.');
        return;
      }

      const targetProductId = product?.product_id || product?.productId;
      if (!targetProductId) {
        setMessage("❌ This product has no ID, so it can't be added.");
        return;
      }

      const { error: pantryErr } = await supabase.from('pantry').insert([
        {
          user_id: user.user_id,
          product_id: targetProductId,
          quantity: 1,
          added_date: toISODate(new Date()),
          expiration_date: expiry ? toISODate(expiry) : null,
        },
      ]);

      if (pantryErr) throw pantryErr;
      setMessage('✅ Product added to pantry successfully!');
    } catch (err) {
      setMessage(`❌ ${err.message || 'Failed to add to pantry'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddPress = () => {
    // Something is typed but it isn't a real date
    if (dateText.length > 0 && !parsedDate) {
      Alert.alert(
        'Check the date',
        'Please enter the expiry date as DD/MM/YYYY, or clear it to add without one.'
      );
      return;
    }

    // No date at all: let them add one, or carry on knowingly
    if (!parsedDate) {
      Alert.alert(
        'No expiry date',
        "Without a date we can't remind you when this expires. Add it anyway?",
        [
          { text: 'Add a date', style: 'cancel' },
          { text: 'Add anyway', onPress: () => addToPantry(null) },
        ]
      );
      return;
    }

    addToPantry(parsedDate);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={32} color={colors.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProductFromSupabase}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Map dynamic product fields (supports both Open Food Facts API & Supabase table structures)
  const title = product.product_name || product.productName || product.name || 'Unknown Product';
  const brand = product.brands || product.brand || product.category || 'General';
  const imageUrl =
    product.image_url ||
    product.image_front_url ||
    product.imageUrl ||
    null;
  const ingredients = product.ingredients_text || product.ingredients || 'Ingredients not available.';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={32} color={colors.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Dynamic Product Image */}
        <View style={styles.imageContainer}>
          {imageUrl && !imageFailed ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImage}
              resizeMode="contain"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Ionicons name="fast-food-outline" size={64} color="#cbd5e1" />
          )}
        </View>

        {/* Product Title & Brand */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>

        {/* Best before date */}
        <View style={styles.expiryCard}>
          <Text style={styles.expiryTitle}>Best before</Text>
          <Text style={styles.expiryHint}>Check the date printed on the pack</Text>

          <View style={styles.chipRow}>
            {QUICK_PICKS.map((pick) => {
              const pickText = toDisplayDate(dateFromToday(pick.days));
              const active = dateText === pickText;
              return (
                <TouchableOpacity
                  key={pick.label}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setDateText(pickText)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {pick.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={styles.dateInput}
            value={dateText}
            onChangeText={(text) => setDateText(formatDateInput(text))}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#9ca3af"
            keyboardType="number-pad"
            maxLength={10}
          />

          {dateInfo ? (
            <Text style={[styles.dateStatus, { color: dateInfo.tone.text }]}>
              {dateInfo.text}
            </Text>
          ) : dateText.length === 10 ? (
            <Text style={[styles.dateStatus, { color: status.expired.text }]}>
              That doesn't look like a valid date.
            </Text>
          ) : null}
        </View>

        {/* Ingredients Card */}
        <View style={styles.ingredientsCard}>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          <Text style={styles.ingredientsText}>{ingredients}</Text>
        </View>

        {/* Add to Pantry Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.pantryButton, saving && { opacity: 0.7 }]}
            onPress={handleAddPress}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.pantryButtonText}>Add to pantry</Text>
            )}
          </TouchableOpacity>
        </View>

        {message !== '' && <Text style={styles.successMessage}>{message}</Text>}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 26,
  },
  brand: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    marginBottom: 16,
  },
  expiryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
  },
  expiryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  expiryHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#ffffff',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#ffffff',
  },
  dateStatus: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  ingredientsCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  ingredientsText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#222222',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  pantryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 180,
  },
  pantryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  successMessage: {
    textAlign: 'center',
    color: '#1B5E20',
    fontWeight: '600',
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});