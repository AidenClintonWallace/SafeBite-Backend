package org.example.safebitebackend.pantry.controller;

import org.example.safebitebackend.pantry.domain.Pantry;
import org.example.safebitebackend.pantry.domain.PantryResponse;
import org.example.safebitebackend.pantry.service.PantryService;
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

    @PostMapping("/add")
    public PantryResponse addToPantry(@RequestBody Pantry pantry) {
        return pantryService.addToPantry(pantry);
    }

    @GetMapping("/user/{userId}")
    public List<PantryResponse> getPantryByUser(@PathVariable Integer userId) {
        return pantryService.getPantryByUser(userId);
    }

    @PutMapping("/{pantryId}/quantity/{quantity}")
    public PantryResponse updateQuantity(@PathVariable Integer pantryId,
                                         @PathVariable Integer quantity) {
        return pantryService.updateQuantity(pantryId, quantity);
    }

    @DeleteMapping("/{pantryId}")
    public String removeFromPantry(@PathVariable Integer pantryId) {
        pantryService.removeFromPantry(pantryId);
        return "Pantry item removed successfully";
    }
}