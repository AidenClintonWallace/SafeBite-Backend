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

// Standardized import path and variable name
import { productAPI } from '../../src/services/productApi';

export default function Scanner({ navigation }) {
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!manualCode.trim()) {
      Alert.alert('Enter a barcode', 'Please type or scan a barcode first.');
      return;
    }

    setLoading(true);
    try {
      // Calls the API to check your database
      const food = await productAPI.getFoodByBarcode(manualCode.trim());

      // Navigates to Product screen with the returned data
      navigation?.navigate('Product', { food });
    } catch (err) {
      Alert.alert('Not found', err.message || 'Could not find that product');
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