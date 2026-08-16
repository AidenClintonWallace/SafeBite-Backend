import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotificationAPI } from '../services/api';

const SAFEBITE_GREEN = '#1B5E35';
const MOCK_USER_ID = 1;

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const notifs = await NotificationAPI.getUserNotifications(MOCK_USER_ID);
      setNotifications(notifs);
    } catch (error) {
      console.log('Unable to load notifications (database connection needed)');
      // Mock data for demo
      setNotifications([
        {
          notificationId: 1,
          userId: MOCK_USER_ID,
          message: 'Milk expires in 2 days',
          type: 'expiring-soon',
          sentAt: '2026-08-16T14:00:00',
          status: 'Unread',
        },
        {
          notificationId: 2,
          userId: MOCK_USER_ID,
          message: 'Yogurt has expired',
          type: 'expired',
          sentAt: '2026-08-15T10:00:00',
          status: 'Unread',
        },
        {
          notificationId: 3,
          userId: MOCK_USER_ID,
          message: 'Cheese expires in 5 days',
          type: 'expiring-soon',
          sentAt: '2026-08-14T09:00:00',
          status: 'Unread',
        },
        {
          notificationId: 4,
          userId: MOCK_USER_ID,
          message: 'You marked Bread as consumed',
          type: 'resolved',
          sentAt: '2026-08-13T11:00:00',
          status: 'Read',
        },
        {
          notificationId: 5,
          userId: MOCK_USER_ID,
          message: 'Butter has expired',
          type: 'expired',
          sentAt: '2026-08-12T08:00:00',
          status: 'Read',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveNotification = async (notificationId) => {
    Alert.alert('Mark as Resolved', 'Have you consumed or disposed this item?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Mark as Resolved',
        onPress: async () => {
          try {
            await NotificationAPI.deleteNotification(notificationId);
            setNotifications(
              notifications.filter((n) => n.notificationId !== notificationId)
            );
            Alert.alert('Success', 'Notification resolved');
          } catch (error) {
            Alert.alert('Error', 'Failed to resolve notification');
          }
        },
      },
    ]);
  };

  const groupNotificationsByType = () => {
    const grouped = {
      expired: [],
      'expiring-soon': [],
      resolved: [],
    };

    notifications.forEach((notif) => {
      if (notif.type === 'expired') grouped.expired.push(notif);
      else if (notif.type === 'expiring-soon') grouped['expiring-soon'].push(notif);
      else grouped.resolved.push(notif);
    });

    return grouped;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'expired':
        return 'close-circle';
      case 'expiring-soon':
        return 'alert-circle';
      case 'resolved':
        return 'checkmark-circle';
      default:
        return 'information-circle';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'expired':
        return '#E74C3C';
      case 'expiring-soon':
        return '#FFA500';
      case 'resolved':
        return SAFEBITE_GREEN;
      default:
        return '#999';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'expired':
        return 'Expired';
      case 'expiring-soon':
        return 'Expiring Soon';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Other';
    }
  };

  const renderNotificationCard = (notif) => (
    <View key={notif.notificationId} style={styles.notificationCard}>
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: getNotificationColor(notif.type) + '20' },
        ]}
      >
        <Ionicons
          name={getNotificationIcon(notif.type)}
          size={24}
          color={getNotificationColor(notif.type)}
        />
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{notif.message}</Text>
        <View style={styles.notificationMeta}>
          <Text style={styles.notificationTime}>
            {new Date(notif.sentAt).toLocaleDateString()}
          </Text>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  notif.status === 'Unread' ? '#FFA500' : '#ccc',
              },
            ]}
          />
        </View>
      </View>

      {notif.type !== 'resolved' && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleResolveNotification(notif.notificationId)}
        >
          <Ionicons name="checkmark" size={18} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderNotificationGroup = (type, title, items) => {
    if (items.length === 0) return null;

    return (
      <View key={type} style={styles.groupSection}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupTitle}>{title}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{items.length}</Text>
          </View>
        </View>
        {items.map((notif) => renderNotificationCard(notif))}
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

  const grouped = groupNotificationsByType();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Notifications</Text>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>All caught up!</Text>
          <Text style={styles.emptyStateSubtext}>
            No notifications at the moment
          </Text>
        </View>
      ) : (
        <View>
          {renderNotificationGroup(
            'expired',
            '🔴 Expired',
            grouped.expired
          )}
          {renderNotificationGroup(
            'expiring-soon',
            '⚠️ Expiring Soon',
            grouped['expiring-soon']
          )}
          {renderNotificationGroup(
            'resolved',
            '✅ Resolved',
            grouped.resolved
          )}
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  groupSection: {
    marginBottom: 24,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  countBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1B5E35',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
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
  bottomPadding: {
    height: 40,
  },
});
