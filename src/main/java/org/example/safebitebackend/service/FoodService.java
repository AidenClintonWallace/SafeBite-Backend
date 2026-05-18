package org.example.safebitebackend.service;

import org.example.safebitebackend.domain.FoodResponse;
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

    public FoodResponse getFoodByBarcode(String barcode)
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

        return FoodResponse.builder()
                .name(product.path("product_name").asText())
                .brand(product.path("brands").asText())
                .image(product.path("image_url").asText())
                .nutritionGrade(product.path("nutriscore_grade").asText())
                .build();
    }
}
