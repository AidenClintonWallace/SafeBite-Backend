package org.example.safebitebackend.pantry.domain;

import java.time.LocalDateTime;

public class NotificationResponse {

    private Integer notificationId;
    private Integer userId;
    private String message;
    private String type;
    private LocalDateTime sentAt;
    private String status;

    public NotificationResponse() {
    }

    public NotificationResponse(Integer notificationId, Integer userId, String message,
                                String type, LocalDateTime sentAt, String status) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.sentAt = sentAt;
        this.status = status;
    }

    public Integer getNotificationId() {
        return notificationId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public String getType() {
        return type;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public String getStatus() {
        return status;
    }
}