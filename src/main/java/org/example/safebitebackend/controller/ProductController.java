package org.example.safebitebackend.controller;

import org.example.safebitebackend.DTO.FoodResponse;
import org.example.safebitebackend.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public FoodResponse getProduct(@PathVariable Long id){

        return productService.getProductById(id);

    }
}
