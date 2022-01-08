package com.skilldistillery.purchases.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("purchases")
	public Purchase addPurchase( 
		Purchase purchase,
		HttpServletRequest req,
		HttpServletResponse res
		) {
		res.setStatus(201);
		StringBuffer url = req.getRequestURL();
		url.append("/").append(purchase.getId());
		res.setHeader("Location", url.toString());
		return purchase;
	}
	
	@GetMapping("purchases/{keyword}")
	public List<Purchase> findByPurchaseNameLike(
			@PathVariable String keyword){
		return purchaseSvc.findByPurchaseNameLike(keyword);
	}
}
