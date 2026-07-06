package org.example.safebitebackend.service;

import org.example.safebitebackend.domain.Report;

import java.util.List;

/*
* IReportService.java
* Interface for Report Service class
* Author: Olwethu Mtwazi
* 230036937
 */
public interface IReportService {
    Report create(Report report);
    Report read(String id);
    List<Report> getAll();
    Report update(Report report);
    void delete(String id);

}
