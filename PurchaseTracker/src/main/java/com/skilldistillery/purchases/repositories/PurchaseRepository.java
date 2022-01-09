package com.skilldistillery.purchases.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.purchases.entities.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
	
	List<Purchase> findByNameLike(String keyword1);
	List<Purchase> findByPurchaseDateBetween(LocalDate startDate, LocalDate endDate);
	List<Purchase> findByArrivalDateBetween(LocalDate startDate, LocalDate endDate);
	List<Purchase> findByReturnDateBetween(LocalDate startDate, LocalDate endDate);
	List<Purchase> findAllByOnline(Boolean online);
}
