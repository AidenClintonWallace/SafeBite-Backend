package org.example.safebitebackend.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pantry")
public class Pantry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pantryId;

    private Integer userId;
    private Integer productId;
    private Integer quantity;
    private LocalDate addedDate;
    private LocalDateTime lastUpdated;

    public Pantry() {
    }

    public Pantry(Integer pantryId, Integer userId, Integer productId, Integer quantity,
                  LocalDate addedDate, LocalDateTime lastUpdated) {
        this.pantryId = pantryId;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.addedDate = addedDate;
        this.lastUpdated = lastUpdated;
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
}