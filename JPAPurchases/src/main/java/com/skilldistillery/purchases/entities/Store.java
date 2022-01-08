package com.skilldistillery.purchases.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@Column(name = "number_days_can_return_purchase")
	private int numberDaysCanReturnPurchase;
	
	@JsonIgnore
	@OneToMany(mappedBy = "store")
	private List<Purchase> purchases;
	
	// methods
	public Store() {
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

	public int getNumberDaysCanReturnPurchase() {
		return numberDaysCanReturnPurchase;
	}

	public void setNumberDaysCanReturnPurchase(int numberDaysCanReturnPurchase) {
		this.numberDaysCanReturnPurchase = numberDaysCanReturnPurchase;
	}

	public List<Purchase> getPurchases() {
		return purchases;
	}

	public void setPurchases(List<Purchase> purchases) {
		this.purchases = purchases;
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
		Store other = (Store) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Store [id=" + id + ", name=" + name + ", defaultDaysCanReturn=" + numberDaysCanReturnPurchase + "]";
	}

}
