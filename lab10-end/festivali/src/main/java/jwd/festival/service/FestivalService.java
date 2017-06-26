package jwd.festival.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import jwd.festival.model.Festival;

public interface FestivalService {
	Page<Festival> findAll(int pageNum);
	Festival findOne(Long id);
	void save(Festival festival);
	void remove(Long id);
	Page<Festival> findByMestoId(int pageNum, Long mestoId);
	Page<Festival> pretraga(
			@Param("naziv") String naziv, 
			@Param("organizator") String organizator, 
			@Param("maxCena") Double maxCena,
			int page);
}
