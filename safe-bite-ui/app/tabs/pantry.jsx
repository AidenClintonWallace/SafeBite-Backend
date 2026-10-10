/*Somila Ndoboza
Student Number: 231157592 
 Pantry Screen*/
 
 import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabaseClient';

export default function PantryScreen() {
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pantry')
        .select(`
          *,
          food_product (
            product_name,
            category,
            image_url
          )
        `)
        .order('expiration_date', { ascending: true });

      if (error) throw error;
      setPantryItems(data || []);
    } catch (err) {
      console.error('Error fetching pantry:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (pantryId) => {
    try {
      const { error } = await supabase
        .from('pantry')
        .delete()
        .eq('pantry_id', pantryId);

      if (error) throw error;
      setPantryItems((prev) => prev.filter((item) => item.pantry_id !== pantryId));
    } catch (err) {
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const getExpiryBadge = (dateString) => {
    if (!dateString) return { text: 'No Expiration', bg: '#e5e7eb', color: '#374151' };
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Expired', bg: '#fee2e2', color: '#dc2626' };
    if (diffDays <= 3) return { text: `${diffDays} days left`, bg: '#fef08a', color: '#854d0e' };
    return { text: `${diffDays} days left`, bg: '#dcfce7', color: '#166534' };
  };

  const filteredItems = pantryItems.filter((item) => {
    const name = item.food_product?.product_name || item.custom_name || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderCard = ({ item }) => {
    const productName = item.food_product?.product_name || item.custom_name || 'Pantry Item';
    const category = item.food_product?.category || 'General Pantry';
    const imageUrl = item.food_product?.image_url || 'https://via.placeholder.com/400x200';
    const badge = getExpiryBadge(item.expiration_date);

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
          
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.text}</Text>
          </View>

          <TouchableOpacity style={styles.actionIconButton} onPress={() => removeItem(item.pantry_id)}>
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.productTitle} numberOfLines={1}>{productName}</Text>
          
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
            <Text style={styles.metaText}>
              Expires: {item.expiration_date ? new Date(item.expiration_date).toLocaleDateString() : 'N/A'}
            </Text>
            {item.quantity && (
              <Text style={styles.quantityText}>• Qty: {item.quantity}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Pantry</Text>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={18} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find items in your pantry..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0c7a43" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.pantry_id.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pantry items found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1e293b' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: { height: 130, width: '100%', position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '700' },
  actionIconButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDetails: { padding: 14 },
  categoryText: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 },
  productTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginVertical: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 12, color: '#64748b', marginLeft: 4 },
  quantityText: { fontSize: 12, color: '#64748b', marginLeft: 6, fontWeight: '600' },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 14 },
});