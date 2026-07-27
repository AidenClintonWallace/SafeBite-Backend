package org.example.safebitebackend.controller;

import org.example.safebitebackend.domain.FoodEntity;
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
    public FoodEntity getFood(@PathVariable String barcode) throws IOException, InterruptedException {
        return foodService.getFoodByBarcode(barcode);
    }

    @GetMapping("/savedFoods")
    public List<FoodEntity> getAllSavedFoods() {
        return foodService.getAll();
    }

    @PostMapping
    public FoodEntity createFoodEntity(@PathVariable FoodEntity food)
    {
        return foodService.saveFood(food);
    }

    @PutMapping("/{id}")
    public FoodEntity updatefood(@PathVariable Long id,@RequestBody FoodEntity food){
        return foodService.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public void deletefood(@PathVariable Long id){
        foodService.deleteFood(id);
    }

}