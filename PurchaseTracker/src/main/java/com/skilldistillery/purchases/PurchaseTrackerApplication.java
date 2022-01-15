package com.skilldistillery.purchases;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PurchaseTrackerApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(PurchaseTrackerApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(PurchaseTrackerApplication.class, args);
	}

}
