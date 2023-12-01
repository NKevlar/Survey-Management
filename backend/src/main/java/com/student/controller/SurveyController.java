package com.student.controller;

import com.student.database.SurveyRepositoryJpa;
import com.student.modal.SurveyData;
import com.student.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
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

    @GetMapping("/{id}")
    public ResponseEntity<SurveyData> getSurveyById(@PathVariable Long id) {
        Optional<SurveyData> survey = surveyService.getEntityById(id);

        if (survey.isPresent()) {
            return new ResponseEntity<>(survey.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateSurveyData(@PathVariable Long id, @RequestBody SurveyData updatedSurvey) {
        if (!repository.existsById(id)) {
            return new ResponseEntity<>("Survey with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }

        if (updatedSurvey.getFirstName() == null || updatedSurvey.getLastName() == null ||
                updatedSurvey.getStreetAddress() == null || updatedSurvey.getCity() == null ||
                updatedSurvey.getState() == null || updatedSurvey.getZip() == null ||
                updatedSurvey.getPhoneNumber() == null || updatedSurvey.getEmail() == null ||
                updatedSurvey.getDateOfSurvey() == null || updatedSurvey.getLikedFeatures() == null ||
                updatedSurvey.getInterestedSources() == null || updatedSurvey.getLikelihoodRecommendation() == null) {
            return new ResponseEntity<>("Required fields are missing.", HttpStatus.BAD_REQUEST);
        }
        surveyService.updateEntity(id, updatedSurvey);

        return new ResponseEntity<>("Survey data updated successfully for Survey Id " + id, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEntity(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return new ResponseEntity<>("Survey with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
        surveyService.deleteEntity(id);
        return new ResponseEntity<>("Survey data deleted successfully.", HttpStatus.OK);
    }

}
