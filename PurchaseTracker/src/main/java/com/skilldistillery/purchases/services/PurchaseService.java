package com.skilldistillery.purchases.services;

import java.time.LocalDate;
import java.util.List;

import com.skilldistillery.purchases.entities.Purchase;


public interface PurchaseService {

	// Purchases
	List<Purchase> getAllPurchases();
	Purchase getPurchaseByID(int purchaseId);
	Purchase addPurchase(Purchase purchase);
	
	// update change all fields
	Purchase updatePurchaseById(Purchase purchase, int purchaseId);
	
	// sudo dlt like update but with 1 field
	boolean purchasePastReturnDate(int purchaseId);
	// delete accidental add
	boolean deletePurchase(int purchaseId);
	
	List<Purchase> findByPurchaseNameLike(String keyword);
	// purchase date between yyyy-MM-dd
	List<Purchase> findByPurchaseDateRange(LocalDate startDate, LocalDate endDate);
	List<Purchase> findByArrivalDateRange(LocalDate startDate, LocalDate endDate);
	List<Purchase> findByReturnDateRange(LocalDate startDate, LocalDate endDate);
	List<Purchase> findByOrderedOnline(Boolean orderedOnline);
	
	
}
