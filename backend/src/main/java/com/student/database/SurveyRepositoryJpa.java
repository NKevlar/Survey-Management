package com.student.database;

import com.student.modal.SurveyData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepositoryJpa extends JpaRepository<SurveyData, Long> {

}

