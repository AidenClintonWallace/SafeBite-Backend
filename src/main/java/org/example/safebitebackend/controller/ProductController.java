package org.example.safebitebackend.pantry.controller;

import org.example.safebitebackend.pantry.domain.Product;
import org.example.safebitebackend.pantry.domain.ProductResponse;
import org.example.safebitebackend.pantry.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ProductResponse addProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @GetMapping("/{productId}")
    public ProductResponse getProduct(@PathVariable Integer productId) {
        return productService.getProductById(productId);
    }

    @GetMapping("/all")
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping("/{productId}")
    public ProductResponse updateProduct(@PathVariable Integer productId,
                                        @RequestBody Product product) {
        return productService.updateProduct(productId, product);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable Integer productId) {
        productService.deleteProduct(productId);
        return "Product deleted successfully";
    }
}
