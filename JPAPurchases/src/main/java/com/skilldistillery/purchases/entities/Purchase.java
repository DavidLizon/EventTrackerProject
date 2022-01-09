package com.skilldistillery.purchases.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Purchase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private Boolean online;

	@Column(name = "purchase_date")
	private LocalDate purchaseDate;

	@Column(name = "arrival_date")
	private LocalDate arrivalDate;

	@Column(name = "return_date")
	private LocalDate returnDate;
	
	private Boolean returned;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;
	
	@Column(name = "past_return_date")
	private Boolean pastReturnDate;

	// methods
	public Purchase() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean isOnline() {
		return online;
	}

	public void setOnline(Boolean online) {
		this.online = online;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public LocalDate getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(LocalDate arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public Boolean isReturned() {
		return returned;
	}

	public void setReturned(Boolean returned) {
		this.returned = returned;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public Boolean isPastReturnDate() {
		return pastReturnDate;
	}

	public void setPastReturnDate(Boolean pastReturnDate) {
		this.pastReturnDate = pastReturnDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Purchase other = (Purchase) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Puchase [id=" + id + ", name=" + name + "]";
	}

}
