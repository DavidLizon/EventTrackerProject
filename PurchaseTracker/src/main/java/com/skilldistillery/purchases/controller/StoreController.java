package com.skilldistillery.purchases.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@RequestMapping("stores/{nameLike}")
	public List<Store> findStoresByNameLike(
			@PathVariable String nameLike,
			HttpServletResponse res
			) {
		List<Store> stores = storeSvc.findByNameLike(nameLike);
		if(stores.size() == 0) {
			res.setStatus(404);
		}
		return stores;
	}
	
	@RequestMapping("store")
	public Store addStore(
			@RequestBody Store store,
			HttpServletRequest req,
			HttpServletResponse res
			) {
		storeSvc.addStore(store);
		
		if(store.getId() != 0) {
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(store.getId());
			res.setHeader("Location", url.toString());
			return store;
		}
		
		res.setStatus(400);
		return null;
	}
	
	@PutMapping("store/{storeId}")
	public Store updateStore(
			@PathVariable Integer storeId,
			@RequestBody Store store,
			HttpServletResponse res,
			HttpServletRequest req
			) {
		store = storeSvc.updateStoreById(store, storeId);
		return store;
	}
	
}
