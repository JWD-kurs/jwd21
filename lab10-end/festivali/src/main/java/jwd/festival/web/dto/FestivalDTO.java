package jwd.festival.web.dto;

public class FestivalDTO {
	private Long id;
	private String naziv;
	private String organizator;
	private String datumPocetka;
	private Double cenaKarte;
	
	private Long mestoId;
	private String mestoNaziv;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getMestoId() {
		return mestoId;
	}
	public void setMestoId(Long mestoId) {
		this.mestoId = mestoId;
	}
	public String getMestoNaziv() {
		return mestoNaziv;
	}
	public void setMestoNaziv(String mestoNaziv) {
		this.mestoNaziv = mestoNaziv;
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
	public void setDatumPocetka(String datum_pocetka) {
		this.datumPocetka = datum_pocetka;
	}
	public Double getCenaKarte() {
		return cenaKarte;
	}
	public void setCenaKarte(Double cenaKarte) {
		this.cenaKarte = cenaKarte;
	}
}
