package org.example.safebitebackend.service.impl;

import org.example.safebitebackend.DTO.FoodResponse;
import org.example.safebitebackend.domain.Scanner;
import org.example.safebitebackend.repository.ProductRepository;
import org.example.safebitebackend.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public FoodResponse getProductById(Long id) {

        Scanner food = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food product not found"));

        return new FoodResponse(
                food.getProductId(),
                food.getBarcode(),
                food.getName(),
                food.getBrand(),
                food.getIngredients(),
                food.getNutritionGrade()
        );
    }
}