package com.skilldistillery.purchases.entities;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class StoreTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private Store store;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAPurchases");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		store = em.find(Store.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		store = null;
	}

	@Test
	@DisplayName("test store mapping")
	void test() {
		assertNotNull(store);
		assertEquals("Home Depot", store.getName());
	}
	
	@Test
	@DisplayName("test store to purchase OneToMany mapping")
	void test2() {
		assertNotNull(store);
		assertNotNull(store.getPurchases());
		assertTrue(store.getPurchases().size() > 0); 
	}

}
