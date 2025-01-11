package com.example.commandes.controller;

import com.example.commandes.config.CommandesConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/config")
@RefreshScope
@CrossOrigin(origins = "*")
public class ConfigController {
    private static final Logger logger = LoggerFactory.getLogger(ConfigController.class);

    @Autowired
    private CommandesConfig commandesConfig;

    @Autowired
    private Environment environment;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getConfiguration() {
        Map<String, Object> config = new HashMap<>();
        config.put("mes-config-ms.commandes-last", commandesConfig.getCommandesLast());
        
        // Add other configuration properties as needed
        String[] activeProfiles = environment.getActiveProfiles();
        config.put("activeProfiles", activeProfiles);
        
        return ResponseEntity.ok(config);
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshConfiguration() {
        // This endpoint will be called to trigger a configuration refresh
        // The actual refresh is handled by Spring Cloud Config's /actuator/refresh endpoint
        logger.info("Configuration refresh requested");
        return ResponseEntity.ok("Configuration refresh triggered");
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getConfigHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("configServer", "Connected");
        health.put("lastRefresh", System.currentTimeMillis());
        return ResponseEntity.ok(health);
    }
}
