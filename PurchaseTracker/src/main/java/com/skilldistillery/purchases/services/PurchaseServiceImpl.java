package com.skilldistillery.purchases.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.purchases.entities.Purchase;
import com.skilldistillery.purchases.repositories.PurchaseRepository;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	private PurchaseRepository purchaseRepo;
	
	@Override
	public List<Purchase> getAllPurchases() {
		return purchaseRepo.findAll();
	}

	@Override
	public Purchase getPurchaseByID(int purchaseId) {
		// TODO Auto-generated method stub
		return null;
	}

}
