package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.Scanner;

public class FoodFactory {

    public static Scanner createFoodEntity(Long productId, String barcode, String name, String brand, String ingredients, String nutritionGrade) {
        return new Scanner.Builder()
                .setProductId(productId)
                .setBarcode(barcode)
                .setName(name)
                .setBrand(brand)
                .setIngredients(ingredients)
                .setNutritionGrade(nutritionGrade)
                .build();
    }

}