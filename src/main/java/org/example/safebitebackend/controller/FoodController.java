package org.example.safebitebackend.controller;

import org.example.safebitebackend.domain.Scanner;
import org.example.safebitebackend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin("*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/{barcode}")
    public Scanner getFood(@PathVariable String barcode) throws IOException, InterruptedException {
        return foodService.getFoodByBarcode(barcode);
    }

    @GetMapping("/savedFoods")
    public List<Scanner> getAllSavedFoods() {
        return foodService.getAll();
    }

    @PostMapping
    public Scanner createFoodEntity(@PathVariable Scanner food)
    {
        return foodService.saveFood(food);
    }

    @PutMapping("/{id}")
    public Scanner updatefood(@PathVariable Long id,@RequestBody Scanner food){
        return foodService.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public void deletefood(@PathVariable Long id){
        foodService.deleteFood(id);
    }

}