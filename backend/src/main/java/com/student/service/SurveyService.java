package com.student.service;
import com.student.database.SurveyRepositoryJpa;
import com.student.modal.SurveyData;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepositoryJpa repository;

    public List<SurveyData> getAllEntities() {
        return repository.findAll();
    }

    public SurveyData saveEntity(SurveyData entity) {
        return repository.save(entity);
    }

    public Optional<SurveyData> getEntityById(Long id) {
        return repository.findById(id);
    }

    public SurveyData updateEntity(Long id, SurveyData updatedEntity) {
        return getEntityById(id)
                .map(existingEntity -> {
                    BeanUtils.copyProperties(updatedEntity, existingEntity, "id");
                    return repository.save(existingEntity);
                })
                .orElse(null);
    }

    public boolean deleteEntity(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
