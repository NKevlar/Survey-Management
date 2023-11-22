import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AxiosResponse } from 'axios';
import { ApiService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../Survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
  surveyDetail: any
  updateSurveyId: number | null = null;
  likedFeaturesOptions: string[] = ['students', 'location', 'campus', 'atmosphere', 'dorm-rooms', 'sports'];
  interestedSourcesOptions: string[] = ['friends', 'television', 'internet', 'other'];
  showErrorMessage: boolean = false
  showSuccessMessage: boolean = false

  ngOnInit() {
    const surveyId = this.route.snapshot.params['id'];
    if (surveyId) {
      this.updateSurveyId = +surveyId;
      this.loadSurveyData(this.updateSurveyId);}
  }


  loadSurveyData(surveyId: number) {
    this.apiService.fetchSurveyDataById(surveyId).then(() => {
      this.surveyDetail = this.apiService.surveyDetail
      this.surveyForm.setValue({
        firstName: this.surveyDetail.firstName,
        lastName: this.surveyDetail.lastName,
        streetAddress: this.surveyDetail.streetAddress,
        city: this.surveyDetail.city,
        state: this.surveyDetail.state,
        zip: this.surveyDetail.zip,
        phoneNumber: this.surveyDetail.phoneNumber,
        email: this.surveyDetail.email,
        dateOfSurvey: this.surveyDetail.dateOfSurvey,
        likedFeatures: this.surveyDetail.likedFeatures,
        interestedSources: this.surveyDetail.interestedSources,
        likelihoodRecommendation: this.surveyDetail.likelihoodRecommendation,
        additionalComments: this.surveyDetail.additionalComments
      });
    })
  }
  
  submitSurvey() {
    const formData = this.surveyForm.value;
    
    if (this.updateSurveyId !== null)
      return this.apiService.updateSurveyData(this.updateSurveyId, formData)
      else return this.apiService.storeSurveyData(formData)
  }
  
  onSubmit() {
    this.submitSurvey().then(() => {
      this.showErrorMessage = this.apiService.showErrorNotification;
      this.showSuccessMessage = this.apiService.showSuccessNotification;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    })
  }

  onCheckChange(event: any, type: string) {    
    const formArray: FormArray = this.surveyForm.get(type) as FormArray;
    event.target.checked ? formArray.value.push(event.target.value) : formArray.value.splice(formArray.value.indexOf(event.target.value), 1)
  }
}
