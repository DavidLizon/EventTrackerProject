package com.skilldistillery.purchases.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.purchases.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

}