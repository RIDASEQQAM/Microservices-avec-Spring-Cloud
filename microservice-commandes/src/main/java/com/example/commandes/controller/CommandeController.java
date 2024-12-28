package com.example.commandes.controller;

import com.example.commandes.config.CommandesConfig;
import com.example.commandes.model.Commande;
import com.example.commandes.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/commandes")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private CommandesConfig commandesConfig;

    @GetMapping
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @GetMapping("/recent")
    public List<Commande> getRecentCommandes() {
        LocalDate dateLimit = LocalDate.now().minusDays(commandesConfig.getCommandesLast());
        return commandeRepository.findCommandesAfterDate(dateLimit);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long id) {
        return commandeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Commande createCommande(@RequestBody Commande commande) {
        return commandeRepository.save(commande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable Long id, @RequestBody Commande commande) {
        return commandeRepository.findById(id)
                .map(existingCommande -> {
                    commande.setId(id);
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
}
