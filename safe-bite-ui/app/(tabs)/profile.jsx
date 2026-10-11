/*Olwethu Mtwazi
Student Number: 230036937
 Profile Screen*/

 import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabaseClient';
import { getCurrentUser, setCurrentUser } from '../../src/services/session';

// Change this to your real support address
const SUPPORT_EMAIL = 'support@safebite.com';

const HELP_ITEMS = [
  {
    q: 'How do I add something to my pantry?',
    a: 'Open the Scan tab, type or scan the barcode, then tap "Add to pantry" on the product page.',
  },
  {
    q: 'What do the expiry colours mean?',
    a: 'Green means you have plenty of time, yellow means 3 days or less, and red means it has expired.',
  },
  {
    q: "My barcode wasn't found. What now?",
    a: 'Not every product is in our database yet. Use My Reports to let us know which product is missing.',
  },
  {
    q: 'How do I change my details?',
    a: 'Tap Edit Profile on this page to update your name and phone number.',
  },
];

// Defined outside the screen so typing in inputs doesn't remount it
const SheetModal = ({ visible, title, onClose, children }) => (
  <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <KeyboardAvoidingView
      style={styles.modalBackdrop}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

const toProfile = (u) => ({
  fullName: u.first_name || u.email?.split('@')[0] || 'User',
  email: u.email,
  phoneNumber: u.phone_number || 'N/A',
  itemsTracked: u.items_tracked ?? 0,
  itemsSaved: u.items_saved ?? 0,
});

const GUEST = {
  fullName: 'Guest User',
  email: 'guest@safebite.com',
  phoneNumber: 'N/A',
  itemsTracked: 0,
  itemsSaved: 0,
};

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'privacy' | 'help' | null
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current ? toProfile(current) : GUEST);
  }, []);

  const openEdit = () => {
    const current = getCurrentUser();
    if (!current) {
      Alert.alert('Not logged in', 'Please log in again to edit your profile.');
      return;
    }
    setEditName(current.first_name || '');
    setEditPhone(current.phone_number || '');
    setActiveModal('edit');
  };

  const saveProfile = async () => {
    const current = getCurrentUser();
    if (!current) return;

    if (!editName.trim()) {
      Alert.alert('Name required', 'Please enter your name.');
      return;
    }

    setSaving(true);
    try {
      const updates = {
        first_name: editName.trim(),
        phone_number: editPhone.trim(),
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('user_id', current.user_id);

      if (error) throw error;

      const updated = { ...current, ...updates };
      setCurrentUser(updated);
      setUser(toProfile(updated));
      setActiveModal(null);
    } catch (err) {
      Alert.alert('Error', err.message || 'Could not save your changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.replace('/login');
  };

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', onPress: openEdit },
    { icon: 'bell-outline', label: 'Notification Settings', onPress: () => router.push('/notifications') },
    { icon: 'flag-outline', label: 'My Reports', onPress: () => router.push('/report') },
    { icon: 'shield-check-outline', label: 'Privacy & Safety', onPress: () => setActiveModal('privacy') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => setActiveModal('help') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SafeBite</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Avatar + name */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.name}>{user?.fullName || 'User Profile'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.itemsTracked ?? 0}</Text>
            <Text style={styles.statLabel}>Items tracked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.itemsSaved ?? 0}</Text>
            <Text style={styles.statLabel}>Items saved</Text>
          </View>
        </View>

        {/* Contact info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Phone number</Text>
          <Text style={styles.infoValue}>{user?.phoneNumber || 'N/A'}</Text>
        </View>

        {/* Menu list */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <MaterialCommunityIcons name={item.icon} size={22} color="#333" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color="#BBB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile */}
      <SheetModal
        visible={activeModal === 'edit'}
        title="Edit Profile"
        onClose={() => setActiveModal(null)}
      >
        <Text style={styles.fieldLabel}>First name</Text>
        <TextInput
          style={styles.input}
          value={editName}
          onChangeText={setEditName}
          placeholder="Your name"
        />

        <Text style={styles.fieldLabel}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={editPhone}
          onChangeText={setEditPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.fieldLabel}>Email</Text>
        <Text style={styles.readOnlyValue}>{user?.email}</Text>

        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.7 }]}
          onPress={saveProfile}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save changes</Text>
          )}
        </TouchableOpacity>
      </SheetModal>

      {/* Privacy & Safety */}
      <SheetModal
        visible={activeModal === 'privacy'}
        title="Privacy & Safety"
        onClose={() => setActiveModal(null)}
      >
        <Text style={styles.sectionTitle}>What we store</Text>
        <Text style={styles.bodyText}>
          Your name, email address, phone number and the items in your pantry. This is used to show
          your pantry and its expiry dates.
        </Text>

        <Text style={styles.sectionTitle}>Food safety</Text>
        <Text style={styles.bodyText}>
          SafeBite is a helper, not a replacement for reading the label. If you have allergies or
          dietary needs, always check the packaging, and when in doubt about an expiry date, throw
          it out.
        </Text>

        <Text style={styles.sectionTitle}>Your account</Text>
        <Text style={styles.bodyText}>
          You can update your details any time from Edit Profile, and log out from the bottom of
          this page.
        </Text>

        <Text style={styles.sectionTitle}>Data sources</Text>
        <Text style={styles.bodyText}>
          Some product details and photos come from Open Food Facts, a free community database.
          That information is added by volunteers and can be incomplete or wrong, so please check
          the label.
        </Text>
      </SheetModal>

      {/* Help & Support */}
      <SheetModal
        visible={activeModal === 'help'}
        title="Help & Support"
        onClose={() => setActiveModal(null)}
      >
        {HELP_ITEMS.map((item) => (
          <View key={item.q} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{item.q}</Text>
            <Text style={styles.bodyText}>{item.a}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
        >
          <Text style={styles.saveButtonText}>Email support</Text>
        </TouchableOpacity>
      </SheetModal>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginBottom: 30,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Modal sheets
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  readOnlyValue: {
    fontSize: 14,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#0c7a43',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 14,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  faqItem: {
    marginBottom: 14,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
});

export default ProfileScreen;