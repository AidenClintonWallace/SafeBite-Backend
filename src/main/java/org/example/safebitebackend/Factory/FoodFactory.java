package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.FoodEntity;

public class FoodFactory {

    public static FoodEntity createFoodEntity(Long productId, String barcode, String name, String brand, String ingredients, String nutritionGrade) {
        return new FoodEntity.Builder()
                .setProductId(productId)
                .setBarcode(barcode)
                .setName(name)
                .setBrand(brand)
                .setIngredients(ingredients)
                .setNutritionGrade(nutritionGrade)
                .build();
    }

}