package com.skilldistillery.purchases.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
