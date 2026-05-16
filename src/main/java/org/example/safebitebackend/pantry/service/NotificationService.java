package org.example.safebitebackend.pantry.service;

import org.example.safebitebackend.pantry.domain.Notification;
import org.example.safebitebackend.pantry.domain.NotificationResponse;
import org.example.safebitebackend.pantry.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public NotificationResponse createNotification(Notification notification) {
        if (notification.getSentAt() == null) {
            notification.setSentAt(LocalDateTime.now());
        }

        if (notification.getStatus() == null) {
            notification.setStatus("Unread");
        }

        Notification savedNotification = notificationRepository.save(notification);
        return mapToResponse(savedNotification);
    }

    public List<NotificationResponse> getNotificationsByUser(Integer userId) {
        return notificationRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteNotification(Integer notificationId) {
        if (!notificationRepository.existsById(notificationId)) {
            throw new RuntimeException("Notification not found");
        }

        notificationRepository.deleteById(notificationId);
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return new NotificationResponse(
                notification.getNotificationId(),
                notification.getUserId(),
                notification.getMessage(),
                notification.getType(),
                notification.getSentAt(),
                notification.getStatus()
        );
    }
}