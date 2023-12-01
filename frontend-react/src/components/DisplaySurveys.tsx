import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/App.service';
import { Survey } from '../Survey';
import "./DisplaySurveys.css"

function DisplaySurveys() {
  const [surveyDetails, setSurveyDetails] = useState<Survey[] | []>([]);
  const navigate = useNavigate();

  const apiService = ApiService
  useEffect(() => {
    ApiService.fetchAllsurveys().then((response: any) => {
      setSurveyDetails(response);
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="header-box">
          <h1>Survey Details</h1>
          <div id="greeting" className="mt-3 mb-3"></div>
      </div>
      <br />
      <br />
      {surveyDetails.map((survey) => (
        <div key={survey.id} className="container my-4">
          <p>
            <strong>Name:</strong> {survey.firstName} {survey.lastName}
          </p>
          <p>
            <strong>Address:</strong> {survey.streetAddress}, {survey.city}, {survey.state}, {survey.zip}
          </p>
          <p>
            <strong>Phone Number:</strong> {survey.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {survey.email}
          </p>
          <p>
            <strong>Date of Survey:</strong> {survey.dateOfSurvey}
          </p>
          <p>
            <strong>Liked Features:</strong> {survey.likedFeatures.join(', ')}
          </p>
          <p>
            <strong>Interested Sources:</strong> {survey.interestedSources.join(', ')}
          </p>
          <p>
            <strong>Likelihood of Recommendation:</strong> {survey.likelihoodRecommendation}
          </p>
          <p>
            <strong>Additional Comments:</strong> {survey.additionalComments}
          </p>
          <button type="button" className="btn btn-primary mr-4" onClick={() => navigate(`/survey/${survey.id}`)}>
            Update
          </button>
          <button type="button" className="btn btn-danger red-button" onClick={() => survey.id && apiService.deleteSurveyDataById(survey.id).then(() => window.location.reload())}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default DisplaySurveys;
