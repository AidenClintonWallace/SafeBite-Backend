package org.example.safebitebackend.pantry.controller;

import org.example.safebitebackend.pantry.domain.Notification;
import org.example.safebitebackend.pantry.domain.NotificationResponse;
import org.example.safebitebackend.pantry.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/create")
    public NotificationResponse createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponse> getNotificationsByUser(@PathVariable Integer userId) {
        return notificationService.getNotificationsByUser(userId);
    }

    @DeleteMapping("/{notificationId}")
    public String deleteNotification(@PathVariable Integer notificationId) {
        notificationService.deleteNotification(notificationId);
        return "Notification deleted successfully";
    }
}