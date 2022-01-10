package com.skilldistillery.purchases.services;

import java.util.List;

import com.skilldistillery.purchases.entities.Store;

public interface StoreService {

	// Stores
	Store addStore(Store store);
	Store updateStoreById(Store store, Integer storeId);
	Store getStoreById(int storeId);
	List<Store> getAllStores();
	List<Store> findByNameLike(String name);
	
}
