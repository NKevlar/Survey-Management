import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios, { AxiosHeaders } from 'axios'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/surveys/';
  showSuccessNotification = false;
  showErrorNotification = false;
  surveyDetails = []

  constructor(private router: Router) { }

  getSuccessNotification() {
    return this.showSuccessNotification
  }

  storeSurveyData(formData: any): any {
    const headers = new AxiosHeaders({ 'Content-Type': 'application/json' });

    return axios.post(this.apiUrl+'store', formData, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.showSuccessNotification = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      } else {
        this.showErrorNotification = true
      }
    })
    .catch(error => {
      console.error('POST Error:', error);
    });;
  }

  fetchAllsurveys(): any{
    const headers = new AxiosHeaders({ 'Content-Type': 'application/json' });

    return axios.get(this.apiUrl, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.surveyDetails = response.data
      }
    })
    .catch(error => {
      console.error('GET Error:', error);
    });;
  }
}
