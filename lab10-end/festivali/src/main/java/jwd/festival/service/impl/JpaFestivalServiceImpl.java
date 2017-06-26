package jwd.festival.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import jwd.festival.model.Festival;
import jwd.festival.repository.FestivalRepository;
import jwd.festival.service.FestivalService;

@Service
@Transactional
public class JpaFestivalServiceImpl implements FestivalService {
	
	@Autowired
	private FestivalRepository festivalRepository;

	@Override
	public Page<Festival> findAll(int pageNum) {
		return festivalRepository.findAll(
				new PageRequest(pageNum, 5));
	}

	@Override
	public Festival findOne(Long id) {
		return festivalRepository.findOne(id);
	}

	@Override
	public void save(Festival festival) {
		festivalRepository.save(festival);
	}

	@Override
	public void remove(Long id) {
		festivalRepository.delete(id);
	}

	@Override
	public Page<Festival> findByMestoId(int pageNum, Long mestoId) {
		
		return festivalRepository.findByMestoId(mestoId, new PageRequest(pageNum, 5));
	}

	@Override
	public Page<Festival> pretraga(String naziv, String organizator, Double maxCena, int page) {
		if(naziv != null ){
			naziv = "%" + naziv + "%";
		}
		
		if(organizator != null ){
			organizator = "%" + organizator + "%";
		}
		return festivalRepository.pretraga(naziv, organizator, maxCena, new PageRequest(page, 5));
	}

}
