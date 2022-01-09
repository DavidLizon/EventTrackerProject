package com.skilldistillery.purchases.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PurchaseTest {
	
	private static EntityManagerFactory emf;
	private static EntityManager em;
	private Purchase purchase;
	
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
		purchase = em.find(Purchase.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		purchase = null;
	}

	@Test
	@DisplayName("test purchase mapping")
	void test() {
		assertNotNull(purchase);
		assertEquals("bathroom", purchase.getName());
		assertEquals(true, purchase.isPastReturnDate());
	}
	
	@Test
	@DisplayName("test purchase to store ManyToOne mapping")
	void test2() {
		assertNotNull(purchase);
		assertNotNull(purchase.getStore());
		assertEquals(1, purchase.getStore().getId());
		assertEquals("Home Depot", purchase.getStore().getName());
	}
	
	@Test
	@DisplayName("test puchase temporal mapping")
	void test3() {
		assertNotNull(purchase);
		assertEquals(2022, purchase.getPurchaseDate().getYear());
		assertEquals(07, purchase.getPurchaseDate().getDayOfMonth());
	}

}
