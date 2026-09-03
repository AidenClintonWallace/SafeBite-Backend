package org.example.safebitebackend.pantry.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PantryResponse {

    private Integer pantryId;
    private Integer userId;
    private Integer productId;
    private String productName;
    private Integer quantity;
    private LocalDate addedDate;
    private LocalDateTime lastUpdated;
    private LocalDate expiryDate;
    private String expiryStatus;
    private Long daysUntilExpiry;

    public PantryResponse() {
    }

    public PantryResponse(Integer pantryId, Integer userId, Integer productId,
                          Integer quantity, LocalDate addedDate,
                          LocalDateTime lastUpdated) {
        this.pantryId = pantryId;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.addedDate = addedDate;
        this.lastUpdated = lastUpdated;
    }

    public PantryResponse(Integer pantryId, Integer userId, Integer productId,
                          String productName, Integer quantity, LocalDate addedDate,
                          LocalDateTime lastUpdated, LocalDate expiryDate,
                          String expiryStatus, Long daysUntilExpiry) {
        this.pantryId = pantryId;
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.addedDate = addedDate;
        this.lastUpdated = lastUpdated;
        this.expiryDate = expiryDate;
        this.expiryStatus = expiryStatus;
        this.daysUntilExpiry = daysUntilExpiry;
    }

    public Integer getPantryId() {
        return pantryId;
    }

    public void setPantryId(Integer pantryId) {
        this.pantryId = pantryId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getExpiryStatus() {
        return expiryStatus;
    }

    public void setExpiryStatus(String expiryStatus) {
        this.expiryStatus = expiryStatus;
    }

    public Long getDaysUntilExpiry() {
        return daysUntilExpiry;
    }

    public void setDaysUntilExpiry(Long daysUntilExpiry) {
        this.daysUntilExpiry = daysUntilExpiry;
    }
}