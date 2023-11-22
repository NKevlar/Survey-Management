import { Injectable } from '@angular/core';

import axios, { AxiosHeaders } from 'axios'; 
import { Router } from '@angular/router';
import { Survey } from './Survey';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api/surveys/';
  headers = new AxiosHeaders({ 'Content-Type': 'application/json' });
  showSuccessNotification = false;
  showErrorNotification = false;
  surveyDetails: Survey[] = []
  surveyDetail: Survey | null = null
  

  getSuccessNotification() {
    return this.showSuccessNotification
  }

  updateSurveyData(surveyId: number, formData: any): any {
    const headers = this.headers
    return axios.put(this.apiUrl+'update/'+surveyId, formData, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.showSuccessNotification = true;
      } else {
        this.showErrorNotification = true
      }
    })
    .catch(error => {
      console.error('PUT Error:', error);
    });
  }

  storeSurveyData(formData: any): any {
    const headers = this.headers
    return axios.post(this.apiUrl+'store', formData, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.showSuccessNotification = true;
      } else {
        this.showErrorNotification = true
      }
    })
    .catch(error => {
      console.error('POST Error:', error);
    });
  }

  fetchAllsurveys(): any{
    const headers = this.headers
    return axios.get(this.apiUrl, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.surveyDetails = response.data
      }
    })
    .catch(error => {
      console.error('GET Error:', error);
    });;
  }

  fetchSurveyDataById(surveyId: number): any{
    const headers = this.headers
    return axios.get(this.apiUrl+surveyId, { headers }).then(response => {
      
      if (response.status === 200 || response.status === 201) {
        this.surveyDetail = response.data
      }
    })
    .catch(error => {
      console.error('GET Error:', error);
    });
  }

  deleteSurveyDataById(surveyId: number): any{
    const headers = this.headers;
    return axios.delete(this.apiUrl+'delete/'+surveyId, { headers }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.surveyDetail = response.data
      }
    })
    .catch(error => {
      console.error('DEL Error:', error);
    });
  }
}
