package org.example.safebitebackend.repository;

import org.example.safebitebackend.domain.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<FoodEntity, Long> {

}
