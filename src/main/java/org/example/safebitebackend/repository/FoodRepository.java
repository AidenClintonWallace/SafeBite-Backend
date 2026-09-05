package org.example.safebitebackend.repository;

import org.example.safebitebackend.domain.Scanner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Scanner, Long> {

}
