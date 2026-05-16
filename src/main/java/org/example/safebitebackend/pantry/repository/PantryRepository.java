package org.example.safebitebackend.pantry.repository;

import org.example.safebitebackend.pantry.domain.Pantry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PantryRepository extends JpaRepository<Pantry, Integer> {

    List<Pantry> findByUserId(Integer userId);

}