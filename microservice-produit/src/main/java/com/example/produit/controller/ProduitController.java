package com.example.produit.controller;

import com.example.produit.model.Produit;
import com.example.produit.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return produitService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.save(produit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return produitService.findById(id)
                .map(existingProduit -> {
                    produit.setId(id);
                    return ResponseEntity.ok(produitService.save(produit));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        return produitService.findById(id)
                .map(produit -> {
                    produitService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
