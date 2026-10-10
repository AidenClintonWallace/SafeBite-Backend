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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../src/services/supabaseClient'; // Adjust path if needed

const USER_ID = 1;

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Accept passed parameters from Expo Router or navigation route
  const productId = params?.productId;
  const scannedFood = params?.food ? JSON.parse(params.food) : null;

  const [product, setProduct] = useState(scannedFood || null);
  const [loading, setLoading] = useState(!scannedFood);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const isScannedFood = Boolean(scannedFood);

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

  const handleAddToPantry = async () => {
    try {
      const targetProductId = product.product_id || product.productId || 1;
      
      const { error: pantryErr } = await supabase.from('pantry').insert([
        {
          user_id: USER_ID,
          product_id: targetProductId,
          quantity: 1,
          added_date: new Date().toISOString().split('T')[0],
        },
      ]);

      if (pantryErr) throw pantryErr;
      setMessage('✅ Product added to pantry successfully!');
    } catch (err) {
      setMessage(`❌ ${err.message || 'Failed to add to pantry'}`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2FA05A" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={32} color="#0c7a43" />
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={32} color="#0c7a43" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Product Title & Brand/Category */}
        <Text style={styles.title}>
          {product.name || product.productName}
        </Text>
        {(product.brand || product.category) && (
          <Text style={styles.brand}>
            {product.brand || product.category}
          </Text>
        )}

        {/* Status Card matching web layout */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.smallText}>Status</Text>
            <Text style={styles.expireText}>Expires soon</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.smallText}>Best before</Text>
            <Text style={styles.dateText}>
              {product.expiryDate
                ? new Date(product.expiryDate).toLocaleDateString()
                : '31/04/2026'}
            </Text>
          </View>
        </View>

        {/* Ingredients Card */}
        {product.ingredients && (
          <View style={styles.ingredientsCard}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <Text style={styles.ingredientsText}>{product.ingredients}</Text>
          </View>
        )}

        {/* Add to Pantry Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.pantryButton} onPress={handleAddToPantry}>
            <Text style={styles.pantryButtonText}>Add to pantry</Text>
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
    color: '#0c7a43',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
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
  statusCard: {
    backgroundColor: '#FDECD2',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  smallText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  expireText: {
    color: '#F39C12',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#F39C12',
    fontSize: 15,
    fontWeight: 'bold',
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
    fontSize: 11,
    lineHeight: 16,
    color: '#222222',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  pantryButton: {
    backgroundColor: '#2FA05A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
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
    backgroundColor: '#2FA05A',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});