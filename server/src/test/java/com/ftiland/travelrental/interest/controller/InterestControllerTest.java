package com.ftiland.travelrental.interest.controller;

import com.ftiland.travelrental.interest.service.InterestService;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
public class InterestControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InterestService interestService;
/*
    @MockBean
    private  InterestContro

 */
}
