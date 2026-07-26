package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.FoodEntity;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FoodFactoryTest {

    @Test
    void createFoodEntity() {
        FoodEntity newFood = FoodFactory.createFoodEntity(
                11L,
                "10100212",
                "Noodles",
                "Indomie",
                "unknown",
                "unknown"

        );

        assertNotNull(newFood);
        System.out.println(newFood);
    }
}