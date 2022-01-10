package com.skilldistillery.purchases.services;

import java.time.LocalDate;
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
			purchase.setOnline(false);
			purchase.setReturned(false);
			purchase.setPastReturnDate(false);
		return purchaseRepo.save(purchase);
	}

	@Override
	public boolean purchasePastReturnDate(int purchaseId) {
		boolean isPastReturnDate = false;
		Optional<Purchase> op = purchaseRepo.findById(purchaseId);
		if(op.isPresent()) {
			Purchase purchase = op.get();
			if(purchase.isPastReturnDate() == false) {
				purchase.setPastReturnDate(true);
				isPastReturnDate = true;
				return isPastReturnDate;
			}
		}
		return isPastReturnDate;
	}

	@Override
	public boolean deletePurchase(int purchaseId) {
		boolean deleted = false;
		Optional<Purchase> op = purchaseRepo.findById(purchaseId);
		if(op.isPresent()) {
			Purchase purchase = op.get();
			purchaseRepo.delete(purchase);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public Purchase updatePurchaseById(Purchase purchase, int purchaseId) {
		Optional<Purchase> purchaseOpt = purchaseRepo.findById(purchaseId);
		Purchase updatedPurchase = null;
		if(purchaseOpt.isPresent()) {
			updatedPurchase = purchaseOpt.get();
		}
		
		if(purchase.getName() != null) {
			updatedPurchase.setName(purchase.getName());
		}
		if(purchase.isOnline() != null) {
			updatedPurchase.setOnline(purchase.isOnline());
		}
		if(purchase.getDelivered() != null) {
			updatedPurchase.setDelivered(purchase.getDelivered());
		}
		if(purchase.getPurchaseDate() != null) {
			updatedPurchase.setPurchaseDate(purchase.getPurchaseDate());
		}
		if(purchase.getArrivalDate() != null) {
			updatedPurchase.setArrivalDate(purchase.getArrivalDate());
		}
		if(purchase.getReturnDate() != null) {
			updatedPurchase.setReturnDate(purchase.getReturnDate());
		}
		if(purchase.isReturned() != null) {
			updatedPurchase.setReturned(purchase.isReturned());
		}
		purchaseRepo.saveAndFlush(updatedPurchase);
		return updatedPurchase;
	}

	@Override
	// purchase date between yyyy-MM-dd
	public List<Purchase> findByPurchaseDateRange(LocalDate startDate, LocalDate endDate) {
		return purchaseRepo.findByPurchaseDateBetween(startDate, endDate);
	}

	@Override
	public List<Purchase> findByArrivalDateRange(LocalDate startDate, LocalDate endDate) {
		return purchaseRepo.findByArrivalDateBetween(startDate, endDate);
	}

	@Override
	public List<Purchase> findByReturnDateRange(LocalDate startDate, LocalDate endDate) {
		return purchaseRepo.findByReturnDateBetween(startDate, endDate);
	}

	@Override
	public List<Purchase> findByDelivered(Boolean delivered) {
		return purchaseRepo.findAllByDelivered(delivered);
	}

	@Override
	public List<Purchase> findByOrderedOnline(Boolean orderedOnline) {
		return purchaseRepo.findAllByOnline(orderedOnline);
	}
	
	
}
