package com.example.commandes.service;

import com.example.commandes.config.CommandesConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MonitoringService implements HealthIndicator {
    private static final Logger logger = LoggerFactory.getLogger(MonitoringService.class);
    
    private final AtomicInteger requestCount = new AtomicInteger(0);
    private final AtomicInteger errorCount = new AtomicInteger(0);
    
    @Autowired
    private CommandesConfig config;

    public void recordRequest() {
        requestCount.incrementAndGet();
    }

    public void recordError() {
        errorCount.incrementAndGet();
    }

    @Override
    public Health health() {
        Map<String, Object> details = new HashMap<>();
        details.put("totalRequests", requestCount.get());
        details.put("totalErrors", errorCount.get());
        details.put("version", config.getServiceVersion());
        
        if (errorCount.get() > 100) {  // Arbitrary threshold
            return Health.down()
                    .withDetails(details)
                    .build();
        }
        
        return Health.up()
                .withDetails(details)
                .build();
    }

    @Scheduled(fixedRate = 3600000) // Reset counts every hour
    public void resetMetrics() {
        if (config.getEnableMetrics()) {
            logger.info("Resetting metrics. Previous counts - Requests: {}, Errors: {}", 
                requestCount.get(), errorCount.get());
            requestCount.set(0);
            errorCount.set(0);
        }
    }

    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("requests", requestCount.get());
        metrics.put("errors", errorCount.get());
        metrics.put("errorRate", errorCount.get() > 0 ? 
            (double) errorCount.get() / requestCount.get() : 0.0);
        metrics.put("metricsEnabled", config.getEnableMetrics());
        return metrics;
    }
}
