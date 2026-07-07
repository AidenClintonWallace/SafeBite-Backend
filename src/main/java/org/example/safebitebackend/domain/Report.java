package org.example.safebitebackend.domain;

/*
* Report.java
* Report domain representing reason for report
* Author: Olwethu Mtwazi
* 230036937
 */


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String issueDescription;
    private String reportStatus;
    private Integer reportId;
    private Integer userId;
    private Integer productId;
    private Integer scanId;
    private LocalDateTime reportDate;

    public Report() {
    }

    public Report(String issueDescription, String reportStatus, Integer reportId,
                  Integer userId, Integer productId, Integer scanId, LocalDateTime reportDate) {

        this.issueDescription = issueDescription;
        this.reportStatus = reportStatus;
        this.reportId = reportId;
        this.userId = userId;
        this.productId = productId;
        this.scanId = scanId;
        this.reportDate = reportDate;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public String getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(String reportStatus) {
        this.reportStatus = reportStatus;
    }

    public Integer getReportId() {
        return reportId;
    }

    public void setReportId(Integer reportId) {
        this.reportId = reportId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getScanId() {
        return scanId;
    }

    public void setScanId(Integer scanId) {
        this.scanId = scanId;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }
}


