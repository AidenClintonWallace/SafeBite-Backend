package org.example.safebitebackend.repository;
/*
* ReportRepository.java
* Repository class for Report
* Author: Olwethu Mtwazi
* 230036937
 */


import org.example.safebitebackend.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, String> {
}
