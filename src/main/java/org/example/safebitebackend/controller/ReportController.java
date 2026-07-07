package org.example.safebitebackend.controller;
/*
* ReportController.java
* Controller class for Report
* Author: Olwethu Mtwazi
* 230036937
 */

import org.example.safebitebackend.DTO.ReportResponse;
import org.example.safebitebackend.domain.Report;
import org.example.safebitebackend.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/create")
    public ReportResponse createReport(@RequestBody Report report) {
        return reportService.createReport(report);
    }

    @GetMapping("/user/{userId}")
    public List<ReportResponse> getReportsByUser(@PathVariable Integer userId) {
        return reportService.getReportsByUser(userId);
    }

    @DeleteMapping("/{reportId}")
    public String deleteReport(@PathVariable Integer reportId) {
        reportService.deleteReport(reportId);
        return "Report deleted successfully";
    }


}
