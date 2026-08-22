package org.example.safebitebackend.service;
/*Kelly Nolte
Student Number:218275358
 Service Package
 DashboardService*/

import org.example.safebitebackend.DTO.DashboardResponse;
import org.springframework.stereotype.Service;
import java.util.Arrays;
@Service
public class DashboardService {
    public DashboardResponse getDashboardData() {

        return new DashboardResponse(
                12,
                3,
                1,
                Arrays.asList(
                        "Lucky Star Pilchards",
                        "Sasko Brown Bread",
                        "Koo Peach Slices"
                )
        );
    }
}//end of class
