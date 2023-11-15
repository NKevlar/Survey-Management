import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AxiosResponse } from 'axios';
import { ApiService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  constructor(private apiService: ApiService, private router: Router) { }


  surveyForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
      lastName: new FormControl(''),
      streetAddress: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      dateOfSurvey: new FormControl(''),
      likedFeatures: new FormControl([]),
      interestedSources: new FormControl([]),
      likelihoodRecommendation: new FormControl(''),
      additionalComments: new FormControl('')
  });

  likedFeaturesOptions: string[] = ['students', 'location', 'campus', 'atmosphere', 'dorm-rooms', 'sports'];
  interestedSourcesOptions: string[] = ['friends', 'television', 'internet', 'other'];
  showErrorNotification: boolean = false
  showSuccessNotification: boolean = false
  
  onSubmit() {
    const formData = this.surveyForm.value;
    this.apiService.storeSurveyData(formData).then(() => {
      this.showErrorNotification = this.apiService.showErrorNotification
      this.showSuccessNotification = this.apiService.showSuccessNotification
    })
  }

  onCheckChange(event: any, type: string) {    
    const formArray: FormArray = this.surveyForm.get(type) as FormArray;
    event.target.checked ? formArray.value.push(event.target.value) : formArray.value.splice(formArray.value.indexOf(event.target.value), 1)
  }
}
