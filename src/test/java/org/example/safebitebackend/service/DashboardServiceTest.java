package org.example.safebitebackend.service;
/*Kelly Nolte
Student Number:218275358
 ServiceTest Package
 DashboardServiceTest*/

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DashboardServiceTest {
    @Test
    void shouldCreateDashboardData() {

        DashboardService service = new DashboardService();

        assertNotNull(service.getDashboardData());
    }

}//end of class
