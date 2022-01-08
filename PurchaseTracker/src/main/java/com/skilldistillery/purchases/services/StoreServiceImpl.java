package com.skilldistillery.purchases.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.purchases.entities.Store;
import com.skilldistillery.purchases.repositories.StoreRepository;

@Service
public class StoreServiceImpl implements StoreService {

	@Autowired
	private StoreRepository storeRepo;

	// Stores
			@Override
			public List<Store> getAllStores() {
				return storeRepo.findAll();
			}

			@Override
			public Store getStoreById(int storeId) {
				Optional<Store> op = storeRepo.findById(storeId);
				if(op.isPresent()) {
					return op.get();
				}
				return null;
			}

			@Override
			public List<Store> findByNameLike(String keyword) {
				// TODO Auto-generated method stub
				return null;
			}

			
}
