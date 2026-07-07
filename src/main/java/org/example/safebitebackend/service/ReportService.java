package org.example.safebitebackend.service;
/*
* ReportService.java
* Service class for Report
* Author: Olwethu Mtwazi
* 230036937
 */

import org.example.safebitebackend.DTO.ReportResponse;
import org.example.safebitebackend.domain.Report;
import org.example.safebitebackend.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public ReportResponse createReport(Report report) {

        if (report.getReportDate() == null) {
            report.setReportDate(LocalDateTime.now());
        }

        if (report.getReportStatus() == null) {
            report.setReportStatus("Pending");
        }

        Report savedReport = reportRepository.save(report);

        return mapToResponse(savedReport);
    }

    public List<ReportResponse> getReportsByUser(Integer userId) {

        return reportRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteReport(Integer reportId) {

        if (!reportRepository.existsById(reportId)) {
            throw new RuntimeException("Report not found");
        }

        reportRepository.deleteById(reportId);
    }

    private ReportResponse mapToResponse(Report report) {

        return new ReportResponse(
                report.getIssueDescription(),
                report.getReportStatus(),
                report.getReportId(),
                report.getUserId(),
                report.getProductId(),
                report.getScanId(),
                report.getReportDate()
        );
    }
}