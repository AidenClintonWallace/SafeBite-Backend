package org.example.safebitebackend.pantry.service;

import org.example.safebitebackend.pantry.domain.Pantry;
import org.example.safebitebackend.pantry.domain.PantryResponse;
import org.example.safebitebackend.pantry.domain.Product;
import org.example.safebitebackend.pantry.repository.PantryRepository;
import org.example.safebitebackend.pantry.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PantryService {

    private final PantryRepository pantryRepository;
    private final ProductRepository productRepository;

    public PantryService(PantryRepository pantryRepository, ProductRepository productRepository) {
        this.pantryRepository = pantryRepository;
        this.productRepository = productRepository;
    }

    public PantryResponse addToPantry(Pantry pantry) {
        if (pantry.getQuantity() == null || pantry.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        if (pantry.getAddedDate() == null) {
            pantry.setAddedDate(LocalDate.now());
        }

        pantry.setLastUpdated(LocalDateTime.now());

        Pantry savedPantry = pantryRepository.save(pantry);
        return mapToResponse(savedPantry);
    }

    public List<PantryResponse> getPantryByUser(Integer userId) {
        return pantryRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<PantryResponse> getPantryByUserAndStatus(Integer userId, String status) {
        List<Pantry> pantryItems = pantryRepository.findByUserId(userId);
        return pantryItems.stream()
                .map(this::mapToResponse)
                .filter(response -> status.equalsIgnoreCase(response.getExpiryStatus()))
                .collect(Collectors.toList());
    }

    public List<PantryResponse> getPantryByUserSorted(Integer userId, String sortBy) {
        List<PantryResponse> pantryItems = getPantryByUser(userId);

        switch (sortBy.toLowerCase()) {
            case "earliest_expiry":
                pantryItems.sort((a, b) -> {
                    if (a.getExpiryDate() == null || b.getExpiryDate() == null) return 0;
                    return a.getExpiryDate().compareTo(b.getExpiryDate());
                });
                break;
            case "latest_expiry":
                pantryItems.sort((a, b) -> {
                    if (a.getExpiryDate() == null || b.getExpiryDate() == null) return 0;
                    return b.getExpiryDate().compareTo(a.getExpiryDate());
                });
                break;
            case "name_asc":
                pantryItems.sort((a, b) -> {
                    if (a.getProductName() == null || b.getProductName() == null) return 0;
                    return a.getProductName().compareTo(b.getProductName());
                });
                break;
            case "name_desc":
                pantryItems.sort((a, b) -> {
                    if (a.getProductName() == null || b.getProductName() == null) return 0;
                    return b.getProductName().compareTo(a.getProductName());
                });
                break;
        }

        return pantryItems;
    }

    public PantryResponse updateQuantity(Integer pantryId, Integer quantity) {
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        Pantry pantry = pantryRepository.findById(pantryId)
                .orElseThrow(() -> new RuntimeException("Pantry item not found"));

        pantry.setQuantity(quantity);
        pantry.setLastUpdated(LocalDateTime.now());

        Pantry updatedPantry = pantryRepository.save(pantry);
        return mapToResponse(updatedPantry);
    }

    public void removeFromPantry(Integer pantryId) {
        if (!pantryRepository.existsById(pantryId)) {
            throw new RuntimeException("Pantry item not found");
        }

        pantryRepository.deleteById(pantryId);
    }

    private PantryResponse mapToResponse(Pantry pantry) {
        Product product = productRepository.findById(pantry.getProductId())
                .orElse(new Product("Unknown Product", LocalDate.now()));

        String expiryStatus = calculateExpiryStatus(product.getExpiryDate());
        Long daysUntilExpiry = calculateDaysUntilExpiry(product.getExpiryDate());

        return new PantryResponse(
                pantry.getPantryId(),
                pantry.getUserId(),
                pantry.getProductId(),
                product.getProductName(),
                pantry.getQuantity(),
                pantry.getAddedDate(),
                pantry.getLastUpdated(),
                product.getExpiryDate(),
                expiryStatus,
                daysUntilExpiry
        );
    }

    private String calculateExpiryStatus(LocalDate expiryDate) {
        if (expiryDate == null) {
            return "UNKNOWN";
        }

        long daysUntil = calculateDaysUntilExpiry(expiryDate);

        if (daysUntil < 0) {
            return "EXPIRED";
        } else if (daysUntil <= 2) {
            return "SOON";
        } else if (daysUntil <= 7) {
            return "SOON";
        } else {
            return "SAFE";
        }
    }

    private Long calculateDaysUntilExpiry(LocalDate expiryDate) {
        if (expiryDate == null) {
            return null;
        }

        return java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), expiryDate);
    }
}