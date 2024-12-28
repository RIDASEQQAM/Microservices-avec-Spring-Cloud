package com.example.commandes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@SpringBootApplication
@RefreshScope
public class CommandesApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommandesApplication.class, args);
    }
}
