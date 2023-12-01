import axios, { AxiosHeaders } from 'axios';
import { Survey } from '../Survey';

const apiUrl = 'http://localhost:8080/api/surveys/';
const headers = new AxiosHeaders({ 'Content-Type': 'application/json' });


const ApiService = {
  updateSurveyData: (surveyId: number, formData: Survey) => {
    return axios.put(`${apiUrl}update/${surveyId}`, formData, {headers})
      .then(response => response.data)
      .catch(error => console.error('PUT Error:', error));
  },

  storeSurveyData(formData: any): any {
    return axios.post(`${apiUrl}store`, formData, { headers })
      .then(response => response.data)
      .catch(error => console.error('POST Error:', error));
  },

  fetchAllsurveys(): any {
    return axios.get(apiUrl, { headers })
      .then(response => response.data)
      .catch(error => console.error('GET Error:', error));
  },

  fetchSurveyDataById(surveyId: number): any {
    return axios.get(`${apiUrl}${surveyId}`, { headers })
      .then(response => response.data)
      .catch(error => console.error('GET Error:', error));
  },

  deleteSurveyDataById(surveyId: number): any {
    return axios.delete(`${apiUrl}delete/${surveyId}`, { headers })
      .then(response => response.data)
      .catch(error => console.error('DELETE Error:', error));
  }
};

export default ApiService;
