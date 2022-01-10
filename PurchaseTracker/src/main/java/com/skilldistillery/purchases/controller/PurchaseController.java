package com.skilldistillery.purchases.controller;

import java.time.LocalDate;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.purchases.entities.Purchase;
import com.skilldistillery.purchases.services.PurchaseService;

@RestController
@RequestMapping("api")
public class PurchaseController {

	@Autowired
	private PurchaseService purchaseSvc;
	
	@GetMapping("purchases")
	public List<Purchase> index() {
		return purchaseSvc.getAllPurchases();
	}
	
	@PostMapping("purchases")
	public Purchase addPurchase( 
		@RequestBody Purchase purchase,
		HttpServletRequest req,
		HttpServletResponse res
		) {
		purchaseSvc.addPurchase(purchase);
			
		if (purchase.getId() != 0) {
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(purchase.getId());
			res.setHeader("Location", url.toString());
			return purchase;
		}
	
		res.setStatus(400);
		return null;
	}
	
	@GetMapping("purchases/{keyword}")
	public List<Purchase> findByPurchaseNameLike(
			@PathVariable String keyword,
			HttpServletResponse res
			){
		List<Purchase> purchases = purchaseSvc.findByPurchaseNameLike(keyword);
		if(purchases.size() == 0) {
			res.setStatus(404);
		}
		return purchases;
	}
	
	@DeleteMapping("purchases/{purchaseId}")
	public void deletePurchase(
		@PathVariable Integer purchaseId,
		HttpServletResponse res
		) {
		if(purchaseSvc.deletePurchase(purchaseId)) {
			res.setStatus(204);
		}
		else {
			res.setStatus(404);
		}
	}
	
	@PutMapping("purchases/{purchaseId}")
	public Purchase updatePurchase(
		@PathVariable Integer purchaseId,
		@RequestBody Purchase purchase,
		HttpServletRequest req,
		HttpServletResponse res
		) {
		purchase = purchaseSvc.updatePurchaseById(purchase, purchaseId);
		return purchase;
	}

	@GetMapping("purchases/date/{startDate}/{endDate}")
	public List<Purchase> findByPurchaseDateRange(
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
		) {
		return purchaseSvc.findByPurchaseDateRange(startDate, endDate);
	}

	@GetMapping("arrivals/date/{startDate}/{endDate}")
	public List<Purchase> findByArrivalDateRange (
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
		) {
		return purchaseSvc.findByArrivalDateRange(startDate, endDate);
	}
	
	@GetMapping("return/date/{startDate}/{endDate}")
	public List<Purchase> findByReturnDateRange (
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
		@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
		) {
		return purchaseSvc.findByReturnDateRange(startDate, endDate);
	}
	
	@GetMapping("purchases/online/delivered/{delivered}")
	public List<Purchase> findByDelivered(
			@PathVariable Boolean delivered
			) {
		return purchaseSvc.findByDelivered(delivered);
	}

	@GetMapping("purchases/online/{online}")
	public List<Purchase> findAllOrderedOnline(
		@PathVariable Boolean online
		) {
		return purchaseSvc.findByOrderedOnline(online);
	}
}
