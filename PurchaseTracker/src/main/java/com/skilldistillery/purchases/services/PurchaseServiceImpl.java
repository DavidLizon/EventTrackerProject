package com.skilldistillery.purchases.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.purchases.entities.Purchase;
import com.skilldistillery.purchases.repositories.PurchaseRepository;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	private PurchaseRepository purchaseRepo;
	
	// Purchases
	@Override
	public List<Purchase> getAllPurchases() {
		return purchaseRepo.findAll();
	}

	@Override
	public Purchase getPurchaseByID(int purchaseId) {
		Optional <Purchase> op = purchaseRepo.findById(purchaseId);
		if(op.isPresent()) {
			return op.get();
		}
		return null;
	}
	
	@Override
	public List<Purchase> findByPurchaseNameLike(String keyword) {
		keyword = "%" + keyword + "%";
		return purchaseRepo.findByNameLike(keyword);
	}

	@Override
	public Purchase addPurchase(Purchase purchase) {
		return purchaseRepo.save(purchase);
	}

//	@Override
//	public List<Purchase> findByPurchaseDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer) {
//		return purchaseRepo.findByPurchaseDate(dateOlder, dateNewer);
//	}
//
//	@Override
//	public List<Purchase> findByArrivalDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer) {
//		return purchaseRepo.findByArrivalDate(dateOlder, dateNewer);
//	}
//
//	@Override
//	public List<Purchase> findByReturnDateRange(LocalDateTime dateOlder, LocalDateTime dateNewer) {
//		return purchaseRepo.findByReturnDate(dateOlder, dateNewer);
//	}
//
//	@Override
//	public List<Purchase> findByOrderedOnline(boolean orderedOnline) {
//		return purchaseRepo.findAllByOnline(orderedOnline);
//	}
	
	
}
