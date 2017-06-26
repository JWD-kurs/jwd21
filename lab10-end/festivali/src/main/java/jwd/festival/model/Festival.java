package jwd.festival.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Festival {
	@Id
	@GeneratedValue
	@Column
	private Long id;
	@Column
	private String naziv;
	@Column
	private String organizator;
	@Column
	private String datumPocetka;
	@Column
	private Double cenaKarte;
	@ManyToOne(fetch=FetchType.EAGER)
	private Mesto mesto;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public String getOrganizator() {
		return organizator;
	}
	public void setOrganizator(String organizator) {
		this.organizator = organizator;
	}
	public String getDatumPocetka() {
		return datumPocetka;
	}
	public void setDatumPocetka(String datumPocetka) {
		this.datumPocetka = datumPocetka;
	}
	public Double getCenaKarte() {
		return cenaKarte;
	}
	public void setCenaKarte(Double cenaKarte) {
		this.cenaKarte = cenaKarte;
	}
	public Mesto getMesto() {
		return mesto;
	}
	public void setMesto(Mesto mesto) {
		this.mesto = mesto;
		if(mesto!=null && !mesto.getFestivali().contains(this)){
			mesto.getFestivali().add(this);
		}
	}
}
