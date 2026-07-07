package org.example.safebitebackend.DTO;
/*
* ReportReponse.java
* DTO class for Report
* Author: Olwethu Mtwazi
* 230036937
 */


import java.time.LocalDateTime;

public class ReportResponse {
    private String issueDescription;
    private String reportStatus;
    private Integer reportId;
    private Integer userId;
    private Integer productId;
    private Integer scanId;
    private LocalDateTime reportDate;


    public ReportResponse(){

    }

    public ReportResponse(String issueDescription,
                          String reportStatus,
                          Integer reportId,
                          Integer userId,
                          Integer productId,
                          Integer scanId,
                          LocalDateTime reportDate){

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
    public String getReportStatus() {
        return reportStatus;
    }
    public Integer getReportId() {
        return reportId;
    }
    public Integer getUserId() {
        return userId;
    }
    public Integer getProductId() {
        return productId;
    }
    public Integer getScanId() {
        return scanId;
    }
    public LocalDateTime getReportDate() {
        return reportDate;
    }
}
