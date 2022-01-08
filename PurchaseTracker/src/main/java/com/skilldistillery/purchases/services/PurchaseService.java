package com.skilldistillery.purchases.services;

import java.time.LocalDateTime;
import java.util.List;

import com.skilldistillery.purchases.entities.Purchase;


public interface PurchaseService {

	// Purchases
	List<Purchase> getAllPurchases();
	Purchase getPurchaseByID(int purchaseId);
	Purchase addPurchase(Purchase purchase);
	
	List<Purchase> findByPurchaseNameLike(String keyword);
//	List<Purchase> findByPurchaseDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer);
//	List<Purchase> findByArrivalDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer);
//	List<Purchase> findByReturnDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer);
//	List<Purchase> findByOrderedOnline(boolean orderedOnline);
	
	
}
