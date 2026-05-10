package org.example.safebitebackend.controller;

import org.example.safebitebackend.domain.FoodResponse;
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
    public FoodResponse getFood(@PathVariable String barcode)
            throws Exception {

        return foodService.getFoodByBarcode(barcode);
    }
}
