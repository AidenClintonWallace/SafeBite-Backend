package org.example.safebitebackend.controller;

import org.example.safebitebackend.domain.Pantry;
import org.example.safebitebackend.DTO.PantryResponse;
import org.example.safebitebackend.service.PantryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pantry")
@CrossOrigin(origins = "*")
public class PantryController {

    private final PantryService pantryService;

    public PantryController(PantryService pantryService) {
        this.pantryService = pantryService;
    }

    // Test endpoint
    @GetMapping("/health")
    public String healthCheck() {
        return "Pantry API is running successfully!";
    }

    // Add product to pantry
    @PostMapping("/add")
    public PantryResponse addToPantry(@RequestBody Pantry pantry) {
        return pantryService.addToPantry(pantry);
    }

    // Get all pantry items for a user
    @GetMapping("/user/{userId}")
    public List<PantryResponse> getPantryByUser(
            @PathVariable Integer userId) {

        return pantryService.getPantryByUser(userId);
    }

    // Get pantry items for a user by status
    @GetMapping("/user/{userId}/status/{status}")
    public List<PantryResponse> getPantryByUserAndStatus(
            @PathVariable Integer userId,
            @PathVariable String status) {

        return pantryService.getPantryByUserAndStatus(userId, status);
    }

    // Get sorted pantry items for a user
    @GetMapping("/user/{userId}/sorted")
    public List<PantryResponse> getPantryByUserSorted(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "earliest_expiry") String sortBy) {

        return pantryService.getPantryByUserSorted(userId, sortBy);
    }

    // Update pantry item quantity
    @PutMapping("/{pantryId}/quantity/{quantity}")
    public PantryResponse updateQuantity(
            @PathVariable Integer pantryId,
            @PathVariable Integer quantity) {

        return pantryService.updateQuantity(pantryId, quantity);
    }

    // Remove item from pantry
    @DeleteMapping("/{pantryId}")
    public String removeFromPantry(
            @PathVariable Integer pantryId) {

        pantryService.removeFromPantry(pantryId);

        return "Pantry item removed successfully";
    }
}