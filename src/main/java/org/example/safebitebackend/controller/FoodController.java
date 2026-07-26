package org.example.safebitebackend.controller;

import org.example.safebitebackend.domain.FoodEntity;
import org.example.safebitebackend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/food")
@CrossOrigin("*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/{barcode}")
    public FoodEntity getFood(@PathVariable String barcode)
            throws Exception {

        return foodService.getFoodByBarcode(barcode);
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