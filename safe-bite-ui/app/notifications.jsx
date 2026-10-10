/*Olwethu Mtwazi
Student Number: 230036937
 Notification Screen*/

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../src/services/supabaseClient'; // Adjust path if needed

export default function NotificationsScreen() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notification')
        .select('*')
        .order('sent_at', { ascending: false });

      if (error) throw error;

      // Group notification records into sections
      const expired = [];
      const expiringSoon = [];
      const earlier = [];

      data.forEach((item) => {
        const formatted = {
          id: item.notification_id.toString(),
          name: item.message.split(':')[0] || item.message,
          subtitle: item.message.includes(':') ? item.message.split(':')[1]?.trim() : null,
          badgeText: item.status,
          badgeColor:
            item.type === 'expired'
              ? '#e53e3e'
              : item.type === 'expiring_soon'
              ? '#eab308'
              : '#22c55e',
        };

        if (item.type === 'expired') expired.push(formatted);
        else if (item.type === 'expiring_soon') expiringSoon.push(formatted);
        else earlier.push(formatted);
      });

      const groupedData = [
        { title: 'Expired', titleColor: '#e53e3e', data: expired },
        { title: 'Expiring soon', titleColor: '#d97706', data: expiringSoon },
        { title: 'Earlier', titleColor: '#16a34a', data: earlier },
      ].filter((section) => section.data.length > 0);

      setSections(groupedData);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
      </View>
      <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
        <Text style={styles.badgeText}>{item.badgeText}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title, titleColor } }) => (
    <Text style={[styles.sectionHeader, { color: titleColor }]}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Notifications</Text>
          <Text style={styles.subTitle}>
            {sections.reduce((acc, s) => acc + s.data.length, 0)} items need attention
          </Text>
        </View>

        <View style={styles.cardContainerWrapper}>
          {loading ? (
            <ActivityIndicator size="large" color="#18794e" style={{ marginTop: 20 }} />
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              stickySectionHeadersEnabled={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  subTitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  cardContainerWrapper: {
    backgroundColor: '#f4f5f6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});