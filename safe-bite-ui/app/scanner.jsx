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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Scanner() {
  const [manualCode, setManualCode] = useState('');

  const handleSearch = () => {
    console.log('Searching barcode:', manualCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Title */}
      <Text style={styles.headerTitle}>Scan barcode</Text>

      {/* Camera Viewfinder Placeholder */}
      <View style={styles.scannerFrame}>
        {/* Dotted Grid Pattern Visual */}
        <View style={styles.gridContainer}>
          {Array.from({ length: 120 }).map((_, index) => (
            <View key={index} style={styles.dot} />
          ))}
        </View>
      </View>

      <Text style={styles.subText}>Align barcode within the frame</Text>

      {/* Manual Entry Section */}
      <View style={styles.manualCard}>
        <Text style={styles.manualLabel}>Or enter manually</Text>
        <View style={styles.inputRow}>
          <TextInput
            placeholder=""
            value={manualCode}
            onChangeText={setManualCode}
            style={styles.input}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="time-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
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
  },
  searchBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});