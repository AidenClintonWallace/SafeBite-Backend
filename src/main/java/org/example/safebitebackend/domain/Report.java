package org.example.safebitebackend.domain;

/*
* Report.java
* Report domain representing reason for report
* Author: Olwethu Mtwazi
* 230036937
 */



import jakarta.persistence.Embeddable;
import lombok.Builder;

import java.sql.Date;

@Embeddable
public class Report {


    private String issueDescription;
    private String reportStatus;
    private int reportId;
    private int userId;
    private int productId;
    private int scanId;
    private Date reportDate;

    protected Report() {
    }

    private Report(Builder builder) {
        this.issueDescription = builder.issueDescription;
        this.reportStatus = builder.reportStatus;
        this.reportId = builder.reportId;
        this.userId = builder.userId;
        this.productId = builder.productId;
        this.scanId = builder.scanId;
        this.reportDate = builder.reportDate;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public String getReportStatus() {
        return reportStatus;
    }

    public int getReportId() {
        return reportId;
    }

    public int getUserId() {
        return userId;
    }

    public int getProductId() {
        return productId;
    }

    public int getScanId() {
        return scanId;
    }

    public Date getReportDate() {
        return reportDate;
    }

    public static class Builder {
        private String issueDescription;
        private String reportStatus;
        private int reportId;
        private int userId;
        private int productId;
        private int scanId;
        private Date reportDate;
    }

    public Builder setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
        return this;
    }

    public Builder setReportStatus(String reportStatus) {
        this.reportStatus = reportStatus;
        return this;
    }

    public Builder setReportId(int reportId) {
        this.reportId = reportId;
        return this;
    }
    public Builder setUserId(int UserId) {
        this.userId = userId;
        return this;
    }
    public Builder setProductId(int productId) {
        this.productId = productId;
        return this;
    }
    public Builder setScanId(int scanId) {
        this.scanId = scanId;
        return this;
    }
    public Builder setReportDate(Date reportDate){
        this.reportDate = reportDate;
        return this;
    }
    public Report Build(){
        if (issueDescription == null || issueDescription.isEmpty()) return null;
        if (reportStatus == null || reportStatus.isEmpty()) return null;
        return new Report(this);
    }
}


