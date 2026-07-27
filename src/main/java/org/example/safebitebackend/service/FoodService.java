package org.example.safebitebackend.service;

import org.example.safebitebackend.Factory.FoodFactory;
import org.example.safebitebackend.domain.FoodEntity;
import org.example.safebitebackend.repository.FoodRepository;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Service
public class FoodService {
    public final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public FoodEntity getFoodByBarcode(String barcode) throws IOException, InterruptedException {

        String url =
                "https://world.openfoodfacts.org/api/v0/product/"
                        + barcode
                        + ".json";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(response.body());

        JsonNode product = root.path("product");

        return mapToEntity(barcode, product);

    }

    public FoodEntity mapToEntity(String barcode, JsonNode product) {

        return FoodFactory.createFoodEntity(
                        null,
                        barcode,
                        product.path("product_name").asText("unknown"),
                        product.path("brands").asText("unknown"),
                        product.path("ingredients_text").asText("unknown"),
                        product.path("nutriscore_grade").asText("unknown")
                );
    }

    public FoodEntity saveFood(FoodEntity food) {
        return foodRepository.save(food);
    }

    public List<FoodEntity> getAll(){
        return foodRepository.findAll();
    }


    public FoodEntity updateFood(Long id,  FoodEntity updatedFood) {
        FoodEntity existingFood = foodRepository.findById(id).orElse(null);

        FoodEntity food = new FoodEntity.Builder()
                .copy(existingFood)
                .setBarcode(updatedFood.getBarcode())
                .setName(updatedFood.getName())
                .setBrand(updatedFood.getBrand())
                .setIngredients(updatedFood.getIngredients())
                .setNutritionGrade(updatedFood.getNutritionGrade())
                .build();

        return foodRepository.save(food);
    }

    public void deleteFood(Long id){
        FoodEntity existingFood = foodRepository.findById(id).orElse(null);

        foodRepository.delete(existingFood);
    }
}

