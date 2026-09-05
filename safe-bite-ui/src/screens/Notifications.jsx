import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

// Mock data structured by sections matching your design
const NOTIFICATION_SECTIONS = [
  {
    title: 'Expired',
    titleColor: '#e53e3e',
    data: [
      {
        id: '1',
        name: 'Koo Peach Slices in Syrup 410g',
        subtitle: 'Expired 2 days ago - remove from pantry',
        badgeText: 'Expired',
        badgeColor: '#e53e3e',
      },
    ],
  },
  {
    title: 'Expiring soon',
    titleColor: '#d97706',
    data: [
      {
        id: '2',
        name: 'Clover Full Cream Milk 1L',
        subtitle: 'Expires tommorow',
        badgeText: '1 day',
        badgeColor: '#eab308',
      },
      {
        id: '3',
        name: 'Sasko Low GI Dumpy Brown Bread 800g',
        subtitle: 'Expires in 3 days',
        badgeText: '2 days',
        badgeColor: '#eab308',
      },
    ],
  },
  {
    title: 'Earlier',
    titleColor: '#16a34a',
    data: [
      {
        id: '4',
        name: 'Lucky Star Pilchards in Tomato Sauce 400g',
        subtitle: null,
        badgeText: 'Resolved',
        badgeColor: '#22c55e',
      },
    ],
  },
];

export default function NotificationsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.subtitle ? (
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        ) : null}
      </View>
      <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
        <Text style={styles.badgeText}>{item.badgeText}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title, titleColor } }) => (
    <Text style={[styles.sectionHeader, { color: titleColor }]}>
      {title}
    </Text>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Main Section Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Notifications</Text>
          <Text style={styles.subTitle}>4 items need attention</Text>
        </View>

        {/* Outer light grey wrapper block */}
        <View style={styles.cardContainerWrapper}>
          <SectionList
            sections={NOTIFICATION_SECTIONS}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
          />
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
    paddingSymmetric: 14,
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