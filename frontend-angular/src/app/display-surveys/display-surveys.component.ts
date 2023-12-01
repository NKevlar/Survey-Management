import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app.service';
import { Survey } from '../Survey'

@Component({
  selector: 'app-display-surveys',
  templateUrl: './display-surveys.component.html',
  styleUrls: ['./display-surveys.component.scss']
})
export class DisplaySurveysComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router ) {}
  surveyDetails: Survey[] = []
  surveyId: number | null = null;
  
  ngOnInit() {
    this.apiService.fetchAllsurveys().then(() => {
      this.surveyDetails = this.apiService.surveyDetails
    })
  }

  deleteSurvey(surveyId: number) {
    this.apiService.deleteSurveyDataById(surveyId).then(() => window.location.reload())
  }
}