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
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../src/services/supabaseClient'; // Adjust path if needed

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      // 1. Get logged-in user session from Supabase
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        // Fallback default if no session found during testing
        setUser({
          fullName: 'Guest User',
          email: 'guest@safebite.com',
          phoneNumber: 'N/A',
          itemsTracked: 0,
          itemsSaved: 0,
        });
        return;
      }

      // 2. Query 'users' table in Supabase for additional profile info
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileData) {
        setUser({
          fullName: profileData.full_name || authUser.email?.split('@')[0],
          email: authUser.email,
          phoneNumber: profileData.phone || 'N/A',
          itemsTracked: profileData.items_tracked ?? 0,
          itemsSaved: profileData.items_saved ?? 0,
        });
      } else {
        setUser({
          fullName: authUser.user_metadata?.full_name || authUser.email,
          email: authUser.email,
          phoneNumber: 'N/A',
          itemsTracked: 0,
          itemsSaved: 0,
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: 'account-edit', label: 'Edit Profile', onPress: () => {} },
    { icon: 'bell-outline', label: 'Notification Settings', onPress: () => router.push('/notifications') },
    { icon: 'flag-outline', label: 'My Reports', onPress: () => router.push('/report') },
    { icon: 'shield-check-outline', label: 'Privacy & Safety', onPress: () => {} },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => {} },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

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
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 40 }} />
        ) : (
          <>
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
          </>
        )}
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