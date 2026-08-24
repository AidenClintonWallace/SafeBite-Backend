package org.example.safebitebackend.repository;

import org.example.safebitebackend.domain.Scanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository
        extends JpaRepository<Scanner, Long> {

}