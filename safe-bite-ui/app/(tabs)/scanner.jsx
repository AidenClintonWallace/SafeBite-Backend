/*Olwethu Mtwazi
Student Number: 230036937
 Scanner Screen*/

 import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabaseClient';

const OFF_URL = 'https://world.openfoodfacts.org/api/v2/product';

// Looks a barcode up on Open Food Facts (free, community-built database).
// Returns a row shaped like food_product, or null if there's no usable entry.
const lookupOpenFoodFacts = async (barcode) => {
  const response = await fetch(
    `${OFF_URL}/${barcode}.json?fields=product_name,generic_name,brands,ingredients_text,image_front_url,image_url`,
    { headers: { 'User-Agent': 'SafeBite/1.0 (student project)' } }
  );
  if (!response.ok) return null;

  const json = await response.json();
  const p = json?.product;
  if (json?.status !== 1 || !p) return null;

  const name = p.product_name || p.generic_name;
  if (!name) return null;

  return {
    barcode,
    name: name.trim(),
    brand: p.brands ? p.brands.split(',')[0].trim() : null,
    ingredients: p.ingredients_text || null,
    image_url: p.image_front_url || p.image_url || null,
  };
};

export default function Scanner() {
  const router = useRouter();
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!manualCode.trim()) {
      Alert.alert('Enter a barcode', 'Please type or scan a barcode first.');
      return;
    }

    const barcode = manualCode.trim();
    setLoading(true);
    try {
      // 1. Check our own table first
      const { data: existing, error } = await supabase
        .from('food_product')
        .select('*')
        .eq('barcode', barcode)
        .maybeSingle();

      if (error) throw error;

      let food = existing;

      // 2. Not in our table, so try Open Food Facts
      if (!food) {
        let found = null;
        try {
          found = await lookupOpenFoodFacts(barcode);
        } catch (netErr) {
          Alert.alert(
            'No connection',
            "Couldn't reach the online product database. Check your connection and try again."
          );
          return;
        }

        if (!found) {
          Alert.alert(
            'Not found',
            "We couldn't find that barcode in SafeBite or the online database yet."
          );
          return;
        }

        // 3. Save it so the next scan (by anyone) finds it instantly
        const { data: saved, error: saveErr } = await supabase
          .from('food_product')
          .insert([found])
          .select()
          .single();

        if (saveErr) {
          Alert.alert('Found it, but could not save it', saveErr.message);
          return;
        }

        food = saved;
      }

      // Route params must be strings, so the product is sent as JSON
      router.push({
        pathname: '/product',
        params: { food: JSON.stringify(food) },
      });
    } catch (err) {
      Alert.alert('Error', err.message || 'Could not look up that product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.headerTitle}>Scan barcode</Text>

      <View style={styles.scannerFrame}>
        <View style={styles.gridContainer}>
          {Array.from({ length: 120 }).map((_, index) => (
            <View key={index} style={styles.dot} />
          ))}
        </View>
      </View>

      <Text style={styles.subText}>Align barcode within the frame</Text>

      <View style={styles.manualCard}>
        <Text style={styles.manualLabel}>Or enter manually</Text>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="e.g. 6001007051044"
            placeholderTextColor="#889"
            value={manualCode}
            onChangeText={setManualCode}
            style={styles.input}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.searchBtnText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  scannerFrame: {
    width: '85%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 1.5,
    margin: 8,
    opacity: 0.8,
  },
  subText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  manualCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    width: '88%',
    padding: 16,
    marginBottom: 20,
  },
  manualLabel: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#e6f2eb',
    borderRadius: 18,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000000',
  },
  searchBtn: {
    backgroundColor: '#18794e',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
    minWidth: 76,
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});