package com.skilldistillery.purchases.services;

import java.util.List;

import com.skilldistillery.purchases.entities.Store;

public interface StoreService {

	// Stores
	List<Store> getAllStores();
	Store getStoreById(int storeId);
	
	List<Store> findByNameLike(String keyword);
	
}
