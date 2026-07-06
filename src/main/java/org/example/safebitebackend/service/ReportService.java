package org.example.safebitebackend.service;
/*
* ReportService.java
* Service class for Report
* Author: Olwethu Mtwazi
* 230036937
 */

import org.example.safebitebackend.domain.Report;
import org.example.safebitebackend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService implements IReportService {

    @Autowired
    private ReportRepository repository;

    @Override
    public Report create(Report report) {
        if (report == null) return null;
        return repository.save(report);
    }
    @Override
    public Report read(String id) {
        return repository.findById(id).orElse(null);
    }
    @Override
    public List<Report> getAll() {
        return repository.findAll();
    }
    @Override
    public Report update(Report report) {
        if (report == null) return null;
        return repository.save(report);
    }
    @Override
    public void delete(String id){
        repository.deleteById(id);
    }

}

