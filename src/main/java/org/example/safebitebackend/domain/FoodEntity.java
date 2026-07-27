package org.example.safebitebackend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "FoodProduct")
public class FoodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private UserEntity user;

    private  String barcode;
    private String name;
    private String brand;
    private String ingredients;
    private String nutritionGrade;

    public FoodEntity() {

    }

    public FoodEntity(Builder builder) {
        this.productId = builder.productId;
        this.user = builder.user;
        this.barcode = builder.barcode;
        this.name = builder.name;
        this.brand = builder.brand;
        this.ingredients = builder.ingredients;
        this.nutritionGrade = builder.nutritionGrade;
    }

    public static class Builder{
        private Long productId;
        private UserEntity user;
        private  String barcode;
        private String name;
        private String brand;
        private String ingredients;
        private String nutritionGrade;

        public Builder setProductId(Long productId) {
            this.productId = productId;
            return this;
        }

        public Builder setUser(UserEntity user) {
            this.user = user;
            return this;
        }

        public Builder setBarcode(String barcode){
            this.barcode = barcode;
            return this;
        }

        public Builder setName(String name){
            this.name = name;
            return this;
        }

        public Builder setBrand(String brand){
            this.brand = brand;
            return this;
        }
        public Builder setIngredients(String ingredients){
            this.ingredients = ingredients;
            return this;
        }

        public Builder setNutritionGrade(String nutritionGrade){
            this.nutritionGrade = nutritionGrade;
            return this;
        }

        public FoodEntity build(){
            return new FoodEntity(this);
        }

        public Builder copy(FoodEntity food){
            this.productId = food.productId;
            this.user = food.user;
            this.barcode = food.barcode;
            this.name = food.name;
            this.brand = food.brand;
            this.ingredients = food.ingredients;
            this.nutritionGrade = food.nutritionGrade;
            return this;
        }
    }

    public UserEntity getUser() {
            return user;
    }

    public String getBarcode() {
        return barcode;
    }

    public String getName() {
        return name;
    }

    public Long getProductId() {
        return productId;
    }

    public String getBrand() {
        return brand;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getNutritionGrade() {
        return nutritionGrade;
    }

    @Override
    public String toString() {
        return "FoodEntity{" +
                "productId=" + productId +
                ", user=" + user +
                ", barcode='" + barcode + '\'' +
                ", name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", ingredients='" + ingredients + '\'' +
                ", nutritionGrade='" + nutritionGrade + '\'' +
                '}';
    }
}
