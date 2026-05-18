package org.example.safebitebackend.service;

import org.example.safebitebackend.domain.Pantry;
import org.example.safebitebackend.DTO.PantryResponse;
import org.example.safebitebackend.repository.PantryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PantryService {

    private final PantryRepository pantryRepository;

    public PantryService(PantryRepository pantryRepository) {
        this.pantryRepository = pantryRepository;
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
        return new PantryResponse(
                pantry.getPantryId(),
                pantry.getUserId(),
                pantry.getProductId(),
                pantry.getQuantity(),
                pantry.getAddedDate(),
                pantry.getLastUpdated()
        );
    }
}