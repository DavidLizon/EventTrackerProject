package com.skilldistillery.purchases.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.purchases.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

	List<Store> findByNameLike(String name);
}
