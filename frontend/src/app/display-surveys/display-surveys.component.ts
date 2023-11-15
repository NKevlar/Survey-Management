import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.service';
import { Survey } from '../Survey';

@Component({
  selector: 'app-display-surveys',
  templateUrl: './display-surveys.component.html',
  styleUrls: ['./display-surveys.component.scss']
})
export class DisplaySurveysComponent implements OnInit {

  constructor(private apiService: ApiService ) {}
  surveyDetails: Survey[] = []
  
  ngOnInit() {
    this.apiService.fetchAllsurveys().then(() => {
      this.surveyDetails = this.apiService.surveyDetails
    })
  }

}
