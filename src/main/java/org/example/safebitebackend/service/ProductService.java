package org.example.safebitebackend.service;

import org.example.safebitebackend.DTO.FoodResponse;

public interface ProductService {

    FoodResponse getProductById(Long id);

}
