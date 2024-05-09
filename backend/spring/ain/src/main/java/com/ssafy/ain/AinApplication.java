package com.ssafy.ain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AinApplication {

	public static void main(String[] args) {
		SpringApplication.run(AinApplication.class, args);
	}

}