package org.example.safebitebackend.DTO;

public class FoodResponse {

    private Long productId;
    private String barcode;
    private String name;
    private String brand;
    private String ingredients;
    private String nutritionGrade;

    public FoodResponse() {
    }

    public FoodResponse(Long productId, String barcode, String name,
                        String brand, String ingredients,
                        String nutritionGrade) {
        this.productId = productId;
        this.barcode = barcode;
        this.name = name;
        this.brand = brand;
        this.ingredients = ingredients;
        this.nutritionGrade = nutritionGrade;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getNutritionGrade() {
        return nutritionGrade;
    }

    public void setNutritionGrade(String nutritionGrade) {
        this.nutritionGrade = nutritionGrade;
    }
}