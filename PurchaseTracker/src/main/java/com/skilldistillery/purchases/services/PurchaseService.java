package com.skilldistillery.purchases.services;

import java.util.List;

import com.skilldistillery.purchases.entities.Purchase;


public interface PurchaseService {

	List<Purchase> getAllPurchases();
	Purchase getPurchaseByID(int purchaseId);
	
}
