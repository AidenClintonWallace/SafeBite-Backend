package org.example.safebitebackend.DTO;
/*Kelly Nolte
Student Number:218275358
 Data Transfer Object(DTO) Package
 DashboardResponse*/

import java.util.List;

public class DashboardResponse {
    private long safeCount;
    private long expiringCount;
    private long expiredCount;
    private List<String> recentItems;

    public DashboardResponse() {}

    public DashboardResponse(
            long safeCount,
            long expiringCount,
            long expiredCount,
            List<String> recentItems) {

        this.safeCount = safeCount;
        this.expiringCount = expiringCount;
        this.expiredCount = expiredCount;
        this.recentItems = recentItems;
    }

    public long getSafeCount() {
        return safeCount;
    }

    public void setSafeCount(long safeCount) {
        this.safeCount = safeCount;
    }

    public long getExpiringCount() {
        return expiringCount;
    }

    public void setExpiringCount(long expiringCount) {
        this.expiringCount = expiringCount;
    }

    public long getExpiredCount() {
        return expiredCount;
    }

    public void setExpiredCount(long expiredCount) {
        this.expiredCount = expiredCount;
    }

    public List<String> getRecentItems() {
        return recentItems;
    }

    public void setRecentItems(List<String> recentItems) {
        this.recentItems = recentItems;
    }
}//end of class
