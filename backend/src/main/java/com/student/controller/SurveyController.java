package com.student.controller;

import com.student.database.SurveyRepositoryJpa;
import com.student.modal.SurveyData;
import com.student.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/surveys")
public class SurveyController {
    @Autowired
    private SurveyService surveyService;

    @Autowired
    private SurveyRepositoryJpa repository;

    @GetMapping("/")
    public ResponseEntity<List<SurveyData>> retrieveAllSurveyData() {
        List<SurveyData> surveys = surveyService.getAllEntities();
        return new ResponseEntity<>(surveys, HttpStatus.OK);
    }

    @PostMapping("/store")
    public ResponseEntity<String> storeSurveyData(@RequestBody SurveyData survey) {
        if (survey.getFirstName() == null || survey.getLastName() == null ||
                survey.getStreetAddress() == null || survey.getCity() == null ||
                survey.getState() == null || survey.getZip() == null ||
                survey.getPhoneNumber() == null || survey.getEmail() == null ||
                survey.getDateOfSurvey() == null || survey.getLikedFeatures() == null ||
                survey.getInterestedSources() == null || survey.getLikelihoodRecommendation() == null) {
            return new ResponseEntity<>("Required fields are missing.", HttpStatus.BAD_REQUEST);
        }

        surveyService.saveEntity(survey);
        return new ResponseEntity<>("Survey data stored successfully.", HttpStatus.CREATED);
    }

}
