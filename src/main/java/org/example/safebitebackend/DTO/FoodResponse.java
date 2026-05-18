package org.example.safebitebackend.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
public class FoodResponse {
    private String name;
    private String brand;
    private String image;
    private String ingredients;
    private String nutritionGrade;

    public FoodResponse() {

    }

    public FoodResponse( String name, String brand, String image, String ingredients, String nutritionGrade) {
        this.name = name;
        this.brand = brand;
        this.image = image;
        this.ingredients = ingredients;
        this.nutritionGrade = nutritionGrade;
    }
}
