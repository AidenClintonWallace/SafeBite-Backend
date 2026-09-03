import React, { useState, useEffect } from 'react';
import { pantryAPI } from '../services/pantryApi';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const USER_ID = 1;

const PantryScreen = ({ navigation }) => {
  const [pantryItems, setPantryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('earliest_expiry');
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [newItem, setNewItem] = useState({
    productName: '',
    expiryDate: '',
    quantity: '',
    category: '',
  });

  useEffect(() => {
    fetchPantryItems();
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [pantryItems, selectedFilter, selectedSort]);

  const fetchPantryItems = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (selectedFilter === 'ALL') {
        data = await pantryAPI.getPantryByUser(USER_ID);
      } else {
        data = await pantryAPI.getPantryByUserAndStatus(
          USER_ID,
          selectedFilter
        );
      }

      setPantryItems(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load pantry items');
      console.error('Error fetching pantry:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilterAndSort = () => {
    let items = [...pantryItems];

    if (selectedFilter !== 'ALL') {
      items = items.filter(item => item.expiryStatus === selectedFilter);
    }

    items.sort((a, b) => {
      switch (selectedSort) {
        case 'earliest_expiry':
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        case 'latest_expiry':
          return new Date(b.expiryDate) - new Date(a.expiryDate);
        case 'name_asc':
          return (a.productName || '').localeCompare(b.productName || '');
        case 'name_desc':
          return (b.productName || '').localeCompare(a.productName || '');
        default:
          return 0;
      }
    });

    setFilteredItems(items);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPantryItems();
    setRefreshing(false);
  };

 const handleAddItem = async () => {
   if (
     !newItem.productName ||
     !newItem.expiryDate ||
     !newItem.quantity
   ) {
     Alert.alert(
       'Validation Error',
       'Please fill in all required fields'
     );
     return;
   }

   try {
     // First create the product
     const product = await pantryAPI.addProduct({
       productName: newItem.productName,
       expiryDate: newItem.expiryDate,
       category: newItem.category || null,
     });

     // Then add the product to the user's pantry
     await pantryAPI.addToPantry({
       userId: USER_ID,
       productId: product.productId,
       quantity: parseInt(newItem.quantity, 10),
       addedDate: new Date().toISOString().split('T')[0],
     });

     Alert.alert(
       'Success',
       'Item added to pantry successfully'
     );

     setShowAddModal(false);

     setNewItem({
       productName: '',
       expiryDate: '',
       quantity: '',
       category: '',
     });

     await fetchPantryItems();

   } catch (err) {
     console.error('Error adding pantry item:', err);

     Alert.alert(
       'Error',
       err.message || 'Failed to add item'
     );
   }
 };

 const handleDeleteItem = (pantryId) => {
   Alert.alert(
     'Delete Item',
     'Are you sure you want to remove this item from your pantry?',
     [
       {
         text: 'Cancel',
         style: 'cancel',
       },
       {
         text: 'Delete',
         style: 'destructive',

         onPress: async () => {
           try {
             await pantryAPI.removePantryItem(pantryId);

             Alert.alert(
               'Success',
               'Item removed from pantry'
             );

             await fetchPantryItems();

           } catch (err) {
             console.error(
               'Error deleting pantry item:',
               err
             );

             Alert.alert(
               'Error',
               err.message ||
                 'Failed to remove pantry item'
             );
           }
         },
       },
     ]
   );
 };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SAFE':
        return '#4CAF50';
      case 'SOON':
        return '#FFC107';
      case 'EXPIRED':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusLabel = (status, daysUntil) => {
    if (status === 'EXPIRED') return 'Expired';
    if (status === 'SOON' && daysUntil !== null) {
      return daysUntil <= 0 ? 'Expired' : `${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
    }
    return status;
  };

  const renderPantryItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.expiryText}>
          Expires {new Date(item.expiryDate).toLocaleDateString()}
        </Text>
        {item.quantity && <Text style={styles.quantityText}>Qty: {item.quantity}</Text>}
      </View>
      <View style={styles.statusBadgeContainer}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.expiryStatus) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusLabel(item.expiryStatus, item.daysUntilExpiry)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.pantryId)}
      >
        <MaterialCommunityIcons name="delete" size={20} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.toggleDrawer?.()}>
          <MaterialCommunityIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SafeBite</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Title and Sort */}
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>My Pantry</Text>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortModal(true)}
          >
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {['ALL', 'SAFE', 'SOON', 'EXPIRED'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter === 'EXPIRED' ? 'Exp' : filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Loading State */}
        {loading && !refreshing && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Loading pantry items...</Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons name="alert-circle" size={48} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => fetchPantryItems()}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons name="inbox-multiple" size={48} color="#9E9E9E" />
            <Text style={styles.emptyText}>Your pantry is empty</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ Add Product</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pantry List */}
        {!loading && !error && filteredItems.length > 0 && (
          <View style={styles.listContainer}>
            <FlatList
              data={filteredItems}
              renderItem={renderPantryItem}
              keyExtractor={(item) => item.pantryId.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Add Button */}
        {filteredItems.length > 0 && (
          <TouchableOpacity
            style={styles.addButtonBottom}
            onPress={() => setShowAddModal(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text style={styles.addButtonBottomText}>Add Product</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Product to Pantry</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.formLabel}>Product Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Lucky Star Pilchards"
                value={newItem.productName}
                onChangeText={(text) =>
                  setNewItem({ ...newItem, productName: text })
                }
              />

              <Text style={styles.formLabel}>Expiry Date *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                value={newItem.expiryDate}
                onChangeText={(text) =>
                  setNewItem({ ...newItem, expiryDate: text })
                }
              />

              <Text style={styles.formLabel}>Quantity *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="1"
                keyboardType="numeric"
                value={newItem.quantity}
                onChangeText={(text) =>
                  setNewItem({ ...newItem, quantity: text })
                }
              />

              <Text style={styles.formLabel}>Category</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Canned Goods"
                value={newItem.category}
                onChangeText={(text) =>
                  setNewItem({ ...newItem, category: text })
                }
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddItem}
              >
                <Text style={styles.submitButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={showSortModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.sortModalContent}>
            <Text style={styles.sortModalTitle}>Sort By</Text>
            {[
              { key: 'earliest_expiry', label: 'Earliest Expiry' },
              { key: 'latest_expiry', label: 'Latest Expiry' },
              { key: 'name_asc', label: 'Product Name A-Z' },
              { key: 'name_desc', label: 'Product Name Z-A' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.sortOption}
                onPress={() => {
                  setSelectedSort(option.key);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    selectedSort === option.key && styles.sortOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedSort === option.key && (
                  <MaterialCommunityIcons name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#333',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sortButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    marginTop: 12,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expiryText: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  quantityText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadgeContainer: {
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
  },
  addButtonBottom: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 4,
    marginVertical: 20,
    gap: 8,
  },
  addButtonBottomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalForm: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    minWidth: '70%',
  },
  sortModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
  },
  sortOptionTextActive: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default PantryScreen;

