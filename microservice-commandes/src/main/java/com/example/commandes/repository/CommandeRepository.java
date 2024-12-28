package com.example.commandes.repository;

import com.example.commandes.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    @Query("SELECT c FROM Commande c WHERE c.date >= :date")
    List<Commande> findCommandesAfterDate(@Param("date") LocalDate date);
}
