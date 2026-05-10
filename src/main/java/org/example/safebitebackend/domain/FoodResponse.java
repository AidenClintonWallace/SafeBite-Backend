package org.example.safebitebackend.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FoodResponse {

    private String name;
    private String brand;
    private String image;
    private String nutritionGrade;
}
