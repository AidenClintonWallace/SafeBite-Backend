import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PantryAPI } from '../services/api';

const SAFEBITE_GREEN = '#1B5E35';
const MOCK_USER_ID = 1;

export default function PantryScreen() {
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('all'); // all, active, expired
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    addedDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadPantryData();
  }, []);

  const loadPantryData = async () => {
    try {
      setLoading(true);
      const items = await PantryAPI.getUserPantry(MOCK_USER_ID);
      setPantryItems(items);
    } catch (error) {
      console.log('Unable to load pantry (database connection needed)');
      // Mock data for demo
      setPantryItems([
        {
          pantryId: 1,
          productId: 101,
          quantity: 5,
          addedDate: '2026-08-10',
          lastUpdated: '2026-08-16T10:00:00',
        },
        {
          pantryId: 2,
          productId: 102,
          quantity: 3,
          addedDate: '2026-08-12',
          lastUpdated: '2026-08-16T10:00:00',
        },
        {
          pantryId: 3,
          productId: 103,
          quantity: 2,
          addedDate: '2026-07-20',
          lastUpdated: '2026-08-16T10:00:00',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getItemStatus = (addedDate) => {
    const now = new Date();
    const itemDate = new Date(addedDate);
    const daysOld = Math.floor((now - itemDate) / (1000 * 60 * 60 * 24));

    if (daysOld > 30) return 'expired';
    if (daysOld > 20) return 'expiring-soon';
    return 'active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'expired':
        return '#E74C3C';
      case 'expiring-soon':
        return '#FFA500';
      case 'active':
        return SAFEBITE_GREEN;
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'expired':
        return 'Expired';
      case 'expiring-soon':
        return 'Expiring Soon';
      case 'active':
        return 'Active';
      default:
        return 'Unknown';
    }
  };

  const filteredItems = pantryItems.filter((item) => {
    const status = getItemStatus(item.addedDate);
    if (filterTab === 'all') return true;
    if (filterTab === 'active') return status === 'active';
    if (filterTab === 'expired') return status === 'expired' || status === 'expiring-soon';
    return true;
  });

  const handleAddItem = async () => {
    if (!formData.productId || !formData.quantity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const newItem = await PantryAPI.addItem(
        MOCK_USER_ID,
        parseInt(formData.productId),
        parseInt(formData.quantity),
        formData.addedDate
      );

      setPantryItems([...pantryItems, newItem]);
      setAddModalVisible(false);
      setFormData({
        productId: '',
        quantity: '',
        addedDate: new Date().toISOString().split('T')[0],
      });
      Alert.alert('Success', 'Item added to pantry!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item. Please try again.');
    }
  };

  const handleRemoveItem = async (pantryId) => {
    Alert.alert('Remove Item', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Remove',
        onPress: async () => {
          try {
            await PantryAPI.removeItem(pantryId);
            setPantryItems(
              pantryItems.filter((item) => item.pantryId !== pantryId)
            );
            Alert.alert('Success', 'Item removed from pantry');
          } catch (error) {
            Alert.alert('Error', 'Failed to remove item');
          }
        },
      },
    ]);
  };

  const renderFilterTab = (tabName, label) => (
    <TouchableOpacity
      style={[
        styles.filterTab,
        filterTab === tabName && styles.filterTabActive,
      ]}
      onPress={() => setFilterTab(tabName)}
    >
      <Text
        style={[
          styles.filterTabText,
          filterTab === tabName && styles.filterTabTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderPantryItem = ({ item }) => {
    const status = getItemStatus(item.addedDate);
    const statusColor = getStatusColor(status);
    const statusLabel = getStatusLabel(status);

    return (
      <View style={styles.pantryItemCard}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemTitle}>Product #{item.productId}</Text>
            <Text style={styles.itemDate}>Added: {item.addedDate}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + '20', borderColor: statusColor },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.pantryId)}
          >
            <Ionicons name="trash" size={18} color="white" />
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={SAFEBITE_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Add Button */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Pantry</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Ionicons name="add-circle" size={28} color={SAFEBITE_GREEN} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {renderFilterTab('all', 'All')}
        {renderFilterTab('active', 'Active')}
        {renderFilterTab('expired', 'Expiring')}
      </View>

      {/* Pantry Items */}
      {filteredItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>No items found</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first pantry item
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderPantryItem}
          keyExtractor={(item) => item.pantryId.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Add Item Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Item to Pantry</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.inputLabel}>Product ID</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 101"
                keyboardType="number-pad"
                value={formData.productId}
                onChangeText={(text) =>
                  setFormData({ ...formData, productId: text })
                }
              />

              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 5"
                keyboardType="number-pad"
                value={formData.quantity}
                onChangeText={(text) =>
                  setFormData({ ...formData, quantity: text })
                }
              />

              <Text style={styles.inputLabel}>Date Added</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={formData.addedDate}
                onChangeText={(text) =>
                  setFormData({ ...formData, addedDate: text })
                }
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddItem}
            >
              <Text style={styles.submitButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    padding: 8,
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterTabActive: {
    borderBottomColor: SAFEBITE_GREEN,
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: SAFEBITE_GREEN,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  pantryItemCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySection: {
    flex: 1,
  },
  quantityLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SAFEBITE_GREEN,
  },
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    backgroundColor: SAFEBITE_GREEN,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
