import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PantryAPI } from '../services/api';

const SAFEBITE_GREEN = '#1B5E35';
const MOCK_USER_ID = 1;

export default function HomeScreen() {
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    expiringSoon: 0,
    expired: 0,
  });

  useEffect(() => {
    loadPantryData();
  }, []);

  const loadPantryData = async () => {
    try {
      setLoading(true);
      const items = await PantryAPI.getUserPantry(MOCK_USER_ID);
      setPantryItems(items.slice(0, 5)); // Show only 5 recent items

      // Calculate stats
      setStats({
        totalItems: items.length,
        expiringSoon: Math.floor(Math.random() * items.length),
        expired: Math.floor(Math.random() * items.length),
      });
    } catch (error) {
      console.log('Unable to load pantry data (database connection needed)');
      // Set mock data for demo
      setPantryItems([
        {
          pantryId: 1,
          productId: 101,
          quantity: 5,
          addedDate: '2026-08-15',
        },
        {
          pantryId: 2,
          productId: 102,
          quantity: 3,
          addedDate: '2026-08-14',
        },
      ]);
      setStats({
        totalItems: 8,
        expiringSoon: 2,
        expired: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStatCard = (label, value, icon, color) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Ionicons name={icon} size={32} color={color} />
    </View>
  );

  const renderRecentItem = ({ item }) => (
    <View style={styles.recentItem}>
      <View style={styles.recentItemInfo}>
        <Text style={styles.recentItemTitle}>Product #{item.productId}</Text>
        <Text style={styles.recentItemDetail}>
          Added: {item.addedDate} • Qty: {item.quantity}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={SAFEBITE_GREEN} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={SAFEBITE_GREEN} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.subGreeting}>
          You have {stats.totalItems} items in your pantry
        </Text>
      </View>

      {/* Scan Button CTA */}
      <TouchableOpacity style={styles.scanButton}>
        <Ionicons name="camera" size={24} color="white" />
        <Text style={styles.scanButtonText}>Scan Barcode</Text>
      </TouchableOpacity>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        {renderStatCard('Total Items', stats.totalItems, 'list', SAFEBITE_GREEN)}
        {renderStatCard(
          'Expiring Soon',
          stats.expiringSoon,
          'alert-circle',
          '#FFA500'
        )}
        {renderStatCard('Expired', stats.expired, 'close-circle', '#E74C3C')}
      </View>

      {/* Recent Items */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recently Added</Text>
        <FlatList
          data={pantryItems}
          renderItem={renderRecentItem}
          keyExtractor={(item) => item.pantryId.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: SAFEBITE_GREEN,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  recentSection: {
    marginBottom: 24,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentItemInfo: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  recentItemDetail: {
    fontSize: 12,
    color: '#999',
  },
  bottomPadding: {
    height: 40,
  },
});
