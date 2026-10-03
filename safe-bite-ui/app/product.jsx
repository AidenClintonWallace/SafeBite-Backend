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
import { productAPI } from '../src/services/productApi';
import { pantryAPI } from '../src/services/pantryApi';

const USER_ID = 1; // TODO: replace with real logged-in user once auth exists

export default function ProductDetailScreen({ navigation, route }) {
  const productId = route?.params?.productId;
  const scannedFood = route?.params?.food; // from Scanner.jsx barcode lookup

  const [product, setProduct] = useState(scannedFood || null);
  const [loading, setLoading] = useState(!scannedFood);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // True when this came from a barcode scan (Scanner/FoodProduct shape:
  // name, brand, ingredients, nutritionGrade) rather than the manual
  // pantry Product shape (productName, category, expiryDate).
  const isScannedFood = Boolean(scannedFood);

  useEffect(() => {
    if (scannedFood) return; // already have the data, no fetch needed
    if (!productId) {
      setError('No product selected');
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productAPI.getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPantry = async () => {
    try {
      await pantryAPI.addToPantry({
        userId: USER_ID,
        productId: product.productId,
        quantity: 1,
        addedDate: new Date().toISOString().split('T')[0],
      });
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back-circle" size={32} color="#0c7a43" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProduct}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back-circle" size={32} color="#0c7a43" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {isScannedFood ? product.name : product.productName}
        </Text>
        {(isScannedFood ? product.brand : product.category) && (
          <Text style={styles.brand}>
            {isScannedFood ? product.brand : product.category}
          </Text>
        )}

        {isScannedFood ? (
          product.nutritionGrade && (
            <View style={styles.statusCard}>
              <View>
                <Text style={styles.smallText}>Nutrition grade</Text>
                <Text style={styles.expireText}>{product.nutritionGrade}</Text>
              </View>
            </View>
          )
        ) : (
          <View style={styles.statusCard}>
            <View>
              <Text style={styles.smallText}>Status</Text>
              <Text style={styles.expireText}>Expiry</Text>
            </View>
            <View style={styles.rightAlign}>
              <Text style={styles.smallText}>Best before</Text>
              <Text style={styles.dateText}>
                {product.expiryDate
                  ? new Date(product.expiryDate).toLocaleDateString()
                  : '-'}
              </Text>
            </View>
          </View>
        )}

        {isScannedFood && product.ingredients && (
          <View style={styles.ingredientsCard}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <Text style={styles.ingredientsText}>{product.ingredients}</Text>
          </View>
        )}

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
