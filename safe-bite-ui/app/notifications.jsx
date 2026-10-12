/*Olwethu Mtwazi
Student Number: 230036937
 Notification Screen*/

 import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../src/services/supabaseClient';
import { getCurrentUser } from '../src/services/session';
import { colors, status } from '../src/theme';

// Same cutoff as the pantry badges and the dashboard
const SOON_DAYS = 3;

// Whole days until the date (negative = already expired), or null if there's no date
const daysLeft = (dateString) => {
  if (!dateString) return null;
  const [y, m, d] = dateString.slice(0, 10).split('-').map(Number);
  if ([y, m, d].some(Number.isNaN)) return null;

  const expiry = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((expiry - today) / (1000 * 60 * 60 * 24));
};

// Works out the notifications from the pantry items themselves
const buildSections = (items) => {
  const expired = [];
  const soon = [];
  let noDate = 0;

  items.forEach((item) => {
    const days = daysLeft(item.expiration_date);
    if (days === null) {
      noDate += 1;
      return;
    }

    const entry = {
      id: String(item.pantry_id),
      name: item.food_product?.name || item.custom_name || 'Pantry item',
      days,
    };

    if (days < 0) expired.push(entry);
    else if (days <= SOON_DAYS) soon.push(entry);
  });

  expired.sort((a, b) => b.days - a.days); // most recently expired first
  soon.sort((a, b) => a.days - b.days); // soonest first

  const sections = [
    { key: 'expired', title: 'Expired', tone: status.expired, icon: 'alert-circle', data: expired },
    { key: 'expiring_soon', title: 'Expiring soon', tone: status.soon, icon: 'time', data: soon },
  ].filter((s) => s.data.length > 0);

  return { sections, noDate };
};

const NotificationCard = ({ item, section }) => {
  const isExpired = item.days < 0;

  let subtitle;
  if (isExpired) {
    subtitle = `Expired ${-item.days} day${item.days === -1 ? '' : 's'} ago`;
  } else if (item.days === 0) {
    subtitle = 'Expires today';
  } else if (item.days === 1) {
    subtitle = 'Expires tomorrow';
  } else {
    subtitle = `Expires in ${item.days} days`;
  }

  // The "Expired" section title already says it, so only show a badge for items still in date
  let badge = null;
  if (!isExpired) {
    badge = item.days === 0 ? 'Today' : item.days === 1 ? '1 day' : `${item.days} days`;
  }

  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: section.tone.bg }]}>
        <Ionicons name={section.icon} size={22} color={section.tone.text} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {badge && (
        <View style={[styles.badge, { backgroundColor: section.tone.bg }]}>
          <Text style={[styles.badgeText, { color: section.tone.text }]}>{badge}</Text>
        </View>
      )}
    </View>
  );
};

export default function NotificationsScreen() {
  const [sections, setSections] = useState([]);
  const [noDate, setNoDate] = useState(0);
  const [pantryCount, setPantryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadNotifications = useCallback(async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setSections([]);
        setNoDate(0);
        setPantryCount(0);
        return;
      }

      const { data, error: fetchErr } = await supabase
        .from('pantry')
        .select('*, food_product (*)')
        .eq('user_id', user.user_id);

      if (fetchErr) throw fetchErr;

      const items = data || [];
      const built = buildSections(items);

      setSections(built.sections);
      setNoDate(built.noDate);
      setPantryCount(items.length);
      setError(null);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setError("Couldn't load your notifications.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  const needAttention = sections.reduce((total, s) => total + s.data.length, 0);
  const summary = `${needAttention} item${needAttention === 1 ? '' : 's'} need${
    needAttention === 1 ? 's' : ''
  } attention`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item, section }) => (
            <NotificationCard item={item} section={section} />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: section.tone.text }]}>
                {section.title}
              </Text>
              <Text style={styles.sectionCount}>{section.data.length}</Text>
            </View>
          )}
          ListHeaderComponent={
            sections.length > 0 ? <Text style={styles.summary}>{summary}</Text> : null
          }
          ListEmptyComponent={
            pantryCount === 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="basket-outline" size={40} color="#cbd5e1" />
                <Text style={styles.emptyTitle}>No notifications yet</Text>
                <Text style={styles.emptyText}>
                  Add items to your pantry and we'll let you know when they're about to expire.
                </Text>
              </View>
            ) : (
              <View style={styles.emptyWrap}>
                <Ionicons name="checkmark-circle-outline" size={40} color="#cbd5e1" />
                <Text style={styles.emptyTitle}>You're all caught up</Text>
                <Text style={styles.emptyText}>
                  Nothing in your pantry is expired or expiring in the next {SOON_DAYS} days.
                </Text>
              </View>
            )
          }
          ListFooterComponent={
            noDate > 0 ? (
              <Text style={styles.footerNote}>
                {noDate} item{noDate === 1 ? ' in your pantry has' : 's in your pantry have'} no
                expiry date set, so we can't track {noDate === 1 ? 'it' : 'them'}.
              </Text>
            ) : null
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  summary: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
  },
  footerNote: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: status.expired.text,
    textAlign: 'center',
    marginTop: 40,
  },
});