package com.student.service;
import com.student.database.SurveyRepositoryJpa;
import com.student.modal.SurveyData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
