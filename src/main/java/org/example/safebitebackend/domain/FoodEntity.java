package org.example.safebitebackend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "FoodProduct")
@Getter
@Setter
@Builder
public class FoodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private  String barcode;
    private String name;
    private String brand;
    private String ingredients;
    private String nutritionGrade;

    public FoodEntity() {

    }

    public FoodEntity(Long productId, String barcode , String name, String brand, String ingredients, String nutritionGrade) {
        this.productId = productId;
        this.barcode = barcode;
        this.name = name;
        this.brand = brand;
        this.ingredients = ingredients;
        this.nutritionGrade = nutritionGrade;
    }
}
