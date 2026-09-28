/*Sylvia Mahlangu
Student Number: 222954396
 Product Screen*/


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen({ navigation }) {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header / Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={32} color="#0c7a43" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Product Title & Category */}
        <Text style={styles.title}>
          Sasko Low Gi Dumpy Seeded Brown Bread 800g
        </Text>
        <Text style={styles.brand}>Bakery</Text>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.smallText}>Status</Text>
            <Text style={styles.expireText}>Expires soon</Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.smallText}>Best before</Text>
            <Text style={styles.dateText}>31/04/2026</Text>
          </View>
        </View>

        {/* Ingredients Card */}
        <View style={styles.ingredientsCard}>
          <Text style={styles.ingredientsTitle}>Ingredients</Text>
          <Text style={styles.ingredientsText}>
            Sasko White Bread Wheat Flour (Gluten), Water, Wheat Bran (Gluten),
            Crushed Wheat (4%) (Gluten), Linseed (2%), De-Hulled Soybean Cuts (2%),
            Yeast, Oat Groats (1%) (Gluten), Sugar, Sunflower Seeds (1%), Sesame
            Seeds (1%), Salt, Wheat Gluten, Acidity Regulator, Preservative (Calcium
            Propionate, Sorbic Acid), Emulsifiers (Vegetable Origin), Flavour,
            Enhancer, Soybean Flour, Minerals (Electrolytic Iron, Zinc Oxide) and
            Vitamins (Vitamin B3, Vitamin B6), Vitamin B1, Vitamin B2, Vitamin A and
            Folic Acid), Flour Improvers, Enzymes (Non-Animal Origin).
          </Text>
        </View>

        {/* Add to Pantry Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.pantryButton}
            onPress={() => setMessage('✅ Product added to pantry successfully!')}
          >
            <Text style={styles.pantryButtonText}>Add to pantry</Text>
          </TouchableOpacity>
        </View>

        {/* Feedback Message */}
        {message !== '' && (
          <Text style={styles.successMessage}>{message}</Text>
        )}

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
});