package com.example.commandes.controller;

import com.example.commandes.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/monitoring")
@CrossOrigin(origins = "*")
public class MonitoringController {
    private static final Logger logger = LoggerFactory.getLogger(MonitoringController.class);

    @Autowired
    private MonitoringService monitoringService;

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(monitoringService.getMetrics());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getDetailedHealth() {
        Map<String, Object> metrics = monitoringService.getMetrics();
        metrics.put("status", "UP");  // You might want to make this more sophisticated
        return ResponseEntity.ok(metrics);
    }

    @PostMapping("/simulate-error")
    public ResponseEntity<String> simulateError() {
        monitoringService.recordError();
        logger.info("Simulated error recorded");
        return ResponseEntity.ok("Error simulated and recorded");
    }

    @PostMapping("/reset-metrics")
    public ResponseEntity<String> resetMetrics() {
        monitoringService.resetMetrics();
        return ResponseEntity.ok("Metrics reset successfully");
    }
}
