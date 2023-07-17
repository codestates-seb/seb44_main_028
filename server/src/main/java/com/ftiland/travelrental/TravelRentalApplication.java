package com.ftiland.travelrental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TravelRentalApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelRentalApplication.class, args);
	}

}
