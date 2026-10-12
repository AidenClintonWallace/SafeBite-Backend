/*Kelly Nolte
Student Number:218275358
 DashboardScreen*/

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../../src/services/supabaseClient';
import { getCurrentUser } from '../../src/services/session';
import { colors, status } from '../../src/theme';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

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

const describeExpiry = (days) => {
  if (days === null) return { text: 'No expiry date set', tone: status.none };
  if (days < 0) {
    return {
      text: `Expired ${-days} day${days === -1 ? '' : 's'} ago`,
      tone: status.expired,
    };
  }
  if (days === 0) return { text: 'Expires today', tone: status.soon };
  if (days === 1) return { text: 'Expires tomorrow', tone: status.soon };
  return {
    text: `Expires in ${days} days`,
    tone: days <= 3 ? status.soon : status.safe,
  };
};

// Product photo, or a neutral placeholder if there's none or it fails to load
const Thumb = ({ uri }) => {
  const [failed, setFailed] = useState(false);

  if (!uri || failed) {
    return (
      <View style={[styles.thumb, styles.thumbPlaceholder]}>
        <Ionicons name="fast-food-outline" size={22} color="#cbd5e1" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.thumb}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
};

const StatBox = ({ count, label, tone }) => (
  <View style={[styles.statBox, { backgroundColor: tone.bg }]}>
    <Text style={[styles.statNumber, { color: tone.text }]}>{count}</Text>
    <Text style={[styles.statLabel, { color: tone.text }]}>{label}</Text>
  </View>
);

const RecentItem = ({ item }) => {
  const name = item.food_product?.name || item.custom_name || 'Pantry item';
  const { text, tone } = describeExpiry(daysLeft(item.expiration_date));

  return (
    <View style={styles.recentCard}>
      <Thumb uri={item.food_product?.image_url} />
      <View style={styles.recentText}>
        <Text style={styles.recentName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.recentExpiry, { color: tone.text }]}>{text}</Text>
      </View>
    </View>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = getCurrentUser();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reload every time the tab is shown, so new items are counted
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const current = getCurrentUser();
        if (!current) {
          setItems([]);
          setLoading(false);
          return;
        }

        try {
          const { data, error: fetchErr } = await supabase
            .from('pantry')
            .select('*, food_product (*)')
            .eq('user_id', current.user_id);

          if (fetchErr) throw fetchErr;
          setItems(data || []);
          setError(null);
        } catch (err) {
          console.error('Error loading dashboard:', err.message);
          setError("Couldn't load your pantry.");
        } finally {
          setLoading(false);
        }
      };

      load();
    }, [])
  );

  // Count items by expiry status (same thresholds as the pantry badges)
  const buckets = { safe: 0, soon: 0, expired: 0, noDate: 0 };
  items.forEach((item) => {
    const days = daysLeft(item.expiration_date);
    if (days === null) buckets.noDate += 1;
    else if (days < 0) buckets.expired += 1;
    else if (days <= 3) buckets.soon += 1;
    else buckets.safe += 1;
  });

  // Newest three items first
  const recent = [...items].sort((a, b) => b.pantry_id - a.pantry_id).slice(0, 3);

  const firstName = user?.first_name;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 20,
        paddingTop: insets.top + 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.greeting}>
        {getGreeting()}
        {firstName ? `, ${firstName}` : ''}
      </Text>
      <Text style={styles.subGreeting}>Here's your pantry at a glance</Text>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => router.push('/scanner')}
        activeOpacity={0.85}
      >
        <Ionicons name="barcode-outline" size={22} color="#ffffff" />
        <Text style={styles.scanButtonText}>Tap to scan barcode</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 30 }} />
      ) : (
        <>
          <View style={styles.statsRow}>
            <StatBox count={buckets.safe} label="Safe" tone={status.safe} />
            <StatBox count={buckets.soon} label="Soon" tone={status.soon} />
            <StatBox count={buckets.expired} label="Expired" tone={status.expired} />
          </View>

          {buckets.noDate > 0 && (
            <Text style={styles.noteText}>
              {buckets.noDate} item{buckets.noDate === 1 ? ' has' : 's have'} no expiry date
              set, so {buckets.noDate === 1 ? "it isn't" : "they aren't"} counted above.
            </Text>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent items</Text>
            {items.length > 0 && (
              <TouchableOpacity onPress={() => router.push('/pantry')}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            )}
          </View>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : recent.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="basket-outline" size={32} color="#cbd5e1" />
              <Text style={styles.emptyText}>
                Your pantry is empty. Scan a barcode to add your first item.
              </Text>
            </View>
          ) : (
            recent.map((item) => <RecentItem key={item.pantry_id} item={item} />)
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  greeting: { fontSize: 26, fontWeight: '800', color: colors.text },
  subGreeting: { fontSize: 14, color: colors.textMuted, marginTop: 2, marginBottom: 20 },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 22,
  },
  scanButtonText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statNumber: { fontSize: 26, fontWeight: '800' },
  statLabel: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  noteText: { fontSize: 12, color: colors.textMuted, marginTop: 10 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  seeAll: { fontSize: 14, fontWeight: '600', color: colors.primary },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: { width: 48, height: 48, borderRadius: 10 },
  thumbPlaceholder: {
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentText: { flex: 1, marginLeft: 12 },
  recentName: { fontSize: 15, fontWeight: '700', color: colors.text },
  recentExpiry: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: { fontSize: 14, color: status.expired.text },
});