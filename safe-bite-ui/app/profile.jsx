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
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// TODO: replace with a real userApi.js call once the user/auth endpoints
// are wired up on the backend (e.g. GET /api/user/{id})
const MOCK_USER = {
  fullName: 'Olwethu Mtwazi',
  email: 'olwethu@safebite.com',
  phoneNumber: '082 345 6789',
  itemsTracked: 16,
  itemsSaved: 12,
};

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Swap this for: userAPI.getUser(USER_ID).then(setUser)
    setUser(MOCK_USER);
  }, []);

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', onPress: () => {} },
    { icon: 'bell-outline', label: 'Notification Settings', onPress: () => {} },
    { icon: 'flag-outline', label: 'My Reports', onPress: () => {} },
    { icon: 'shield-check-outline', label: 'Privacy & Safety', onPress: () => {} },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {} },
  ];

  const handleLogout = () => {
    // TODO: clear auth token / session, then navigate to Login
    navigation?.navigate?.('Login');
  };

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

      <ScrollView style={styles.content}>
        {/* Avatar + name */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.name}>{user?.fullName || 'Loading...'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.itemsTracked ?? '-'}</Text>
            <Text style={styles.statLabel}>Items tracked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.itemsSaved ?? '-'}</Text>
            <Text style={styles.statLabel}>Items saved</Text>
          </View>
        </View>

        {/* Contact info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Phone number</Text>
          <Text style={styles.infoValue}>{user?.phoneNumber || '-'}</Text>
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
});

export default ProfileScreen;