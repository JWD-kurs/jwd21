package jwd.festival;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jwd.festival.model.Festival;
import jwd.festival.model.Mesto;
import jwd.festival.service.FestivalService;
import jwd.festival.service.MestoService;

@Component
public class TestData {
	@Autowired
	private MestoService mestoService;
	@Autowired
	private FestivalService festivalService;

	@PostConstruct
	public void init() {
		
		Mesto subotica = new Mesto();
		subotica.setDrzava("Srbija");
		subotica.setNaziv("Subotica");
		subotica.setPostanskiKod(24000);
		mestoService.save(subotica);
		
		Festival festival1 = new Festival();
		festival1.setNaziv("Summer3p");
		festival1.setCenaKarte(123.99);
		festival1.setDatumPocetka("11.7.2018.");
		festival1.setOrganizator("Grad Subotica");
		festival1.setMesto(subotica);
		festivalService.save(festival1);

		Mesto noviSad = new Mesto();
		noviSad.setDrzava("Srbija");
		noviSad.setNaziv("Novi Sad");
		noviSad.setPostanskiKod(21000);
		mestoService.save(noviSad);

	}
}