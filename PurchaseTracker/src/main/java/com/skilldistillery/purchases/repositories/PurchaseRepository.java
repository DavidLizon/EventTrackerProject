package com.skilldistillery.purchases.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.purchases.entities.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

}
