package org.example.safebitebackend.service;

import org.example.safebitebackend.DTO.FoodResponse;
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

@Service
public class FoodService {
    public final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public FoodEntity getFoodByBarcode(String barcode)
            throws IOException, InterruptedException {

        String url =
                "https://world.openfoodfacts.org/api/v0/product/"
                        + barcode
                        + ".json";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response =
                client.send(request,
                        HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(response.body());

        JsonNode product = root.path("product");

        FoodEntity foodEntity = mapToEntity(product, barcode);

        return foodRepository.save(foodEntity);

    }

    private FoodEntity mapToEntity(JsonNode product, String barcode) {

        FoodEntity food = new FoodEntity();

        food.setBarcode(barcode);
        food.setName(product.path("product_name").asText("unknown"));
        food.setBrand(product.path("brands").asText("unknown"));
        food.setIngredients(product.path("ingredients_text").asText("unknown"));
        food.setNutritionGrade(product.path("nutriscore_grade").asText("unknown"));

        return food;
    }
}

