package com.skilldistillery.purchases.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.purchases.entities.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
	
	List<Purchase> findByNameLike(String keyword1);
//	List<Purchase> findByPurchaseDate(LocalDateTime olderDate, LocalDateTime newerDate);
//	List<Purchase> findByArrivalDate(LocalDateTime olderDate, LocalDateTime newerDate);
//	List<Purchase> findByReturnDate(LocalDateTime olderDate, LocalDateTime newerDate);
//	List<Purchase> findAllByOnline(boolean online);
}
