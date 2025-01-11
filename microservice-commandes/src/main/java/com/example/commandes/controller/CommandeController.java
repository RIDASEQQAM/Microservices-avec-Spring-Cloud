package com.example.commandes.controller;

import com.example.commandes.config.CommandesConfig;
import com.example.commandes.model.Commande;
import com.example.commandes.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.cloud.context.config.annotation.RefreshScope;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/commandes")
@RefreshScope
@CrossOrigin(origins = "*")
public class CommandeController implements HealthIndicator {
    private static final Logger logger = LoggerFactory.getLogger(CommandeController.class);
    private boolean simulateTimeout = false;

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private CommandesConfig commandesConfig;

    @Override
    public Health health() {
        try {
            long count = commandeRepository.count();
            return Health.up()
                    .withDetail("count", count)
                    .withDetail("message", "Service is running normally")
                    .build();
        } catch (Exception e) {
            return Health.down()
                    .withDetail("error", e.getMessage())
                    .build();
        }
    }

    @GetMapping
    public List<Commande> getAllCommandes() throws InterruptedException {
        if (simulateTimeout) {
            Thread.sleep(5000); // Simulate a 5-second delay
        }
        List<Commande> commandes = commandeRepository.findAll();
        logger.info("Found {} total commandes", commandes.size());
        return commandes;
    }

    @GetMapping("/recent")
    public List<Commande> getRecentCommandes() {
        int days = commandesConfig.getCommandesLast();
        LocalDate dateLimit = LocalDate.now().minusDays(days);
        logger.info("Fetching orders after date: {} (last {} days)", dateLimit, days);
        
        List<Commande> recentCommandes = commandeRepository.findCommandesAfterDate(dateLimit);
        logger.info("Found {} recent commandes", recentCommandes.size());
        
        return recentCommandes;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long id) {
        return commandeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Commande createCommande(@RequestBody Commande commande) {
        if (commande.getDate() == null) {
            commande.setDate(LocalDate.now());
        }
        logger.info("Creating new commande with date: {}", commande.getDate());
        return commandeRepository.save(commande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable Long id, @RequestBody Commande commande) {
        return commandeRepository.findById(id)
                .map(existingCommande -> {
                    commande.setId(id);
                    if (commande.getDate() == null) {
                        commande.setDate(existingCommande.getDate());
                    }
                    logger.info("Updating commande with date: {}", commande.getDate());
                    return ResponseEntity.ok(commandeRepository.save(commande));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        return commandeRepository.findById(id)
                .map(commande -> {
                    commandeRepository.delete(commande);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/simulate-timeout")
    public ResponseEntity<String> toggleTimeout() {
        simulateTimeout = !simulateTimeout;
        String message = simulateTimeout ? "Timeout simulation enabled" : "Timeout simulation disabled";
        logger.info(message);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/stats")
    public ResponseEntity<Object> getStats() {
        long totalCommands = commandeRepository.count();
        LocalDate today = LocalDate.now();
        long recentCommands = commandeRepository.findCommandesAfterDate(today.minusDays(7)).size();
        
        return ResponseEntity.ok(Map.of(
            "totalCommands", totalCommands,
            "recentCommands", recentCommands,
            "configuredDays", commandesConfig.getCommandesLast()
        ));
    }
}
