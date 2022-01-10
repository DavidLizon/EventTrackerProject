package com.skilldistillery.purchases.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.purchases.entities.Store;
import com.skilldistillery.purchases.services.StoreService;

@RestController
@RequestMapping("api")
public class StoreController {
	
	@Autowired
	private StoreService storeSvc;
	
	@RequestMapping("stores")
	public List<Store> listAllStores() {
		return storeSvc.getAllStores();
	}
	
	@RequestMapping("store/{storeId}")
	public Store findStoreById (
			@PathVariable Integer storeId,
			HttpServletResponse res
			) {
		Store store = storeSvc.getStoreById(storeId);
		if(store == null) {
			res.setStatus(404);
		}
		return store;
	}
	
}
