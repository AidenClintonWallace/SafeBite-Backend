package org.example.safebitebackend.Factory;

import org.example.safebitebackend.domain.Scanner;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FoodFactoryTest {

    @Test
    void createFoodEntity() {
        Scanner newFood = FoodFactory.createFoodEntity(
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