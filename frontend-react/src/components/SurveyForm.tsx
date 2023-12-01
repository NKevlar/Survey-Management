import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import ApiService from '../services/App.service'
import { Survey } from '../Survey';
import "./SurveyForm.css"

function SurveyForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const apiService = ApiService
  const [updateSurveyId, setUpdateSurveyId] = useState(id ? parseInt(id) : null);
  const [surveyForm, setSurveyForm] = useState<Survey>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phoneNumber: '',
    dateOfSurvey: '',
    likedFeatures: [],
    interestedSources: [],
    likelihoodRecommendation: '',
    additionalComments: ''
  });

  const likedFeaturesOptions = ['students', 'location', 'campus', 'atmosphere', 'dorm-rooms', 'sports'];
  const interestedSourcesOptions = ['friends', 'television', 'internet', 'other'];
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const surveyId = id;
    if (surveyId) {
      setUpdateSurveyId(parseInt(surveyId))
      loadSurveyData(updateSurveyId);}
  });

  const loadSurveyData = (surveyId: any) => {
    apiService.fetchSurveyDataById(surveyId).then((surveyDetail: Survey) => {
      setSurveyForm({
        firstName: surveyDetail.firstName,
        lastName: surveyDetail.lastName,
        streetAddress: surveyDetail.streetAddress,
        city: surveyDetail.city,
        state: surveyDetail.state,
        zip: surveyDetail.zip,
        phoneNumber: surveyDetail.phoneNumber,
        email: surveyDetail.email,
        dateOfSurvey: surveyDetail.dateOfSurvey,
        likedFeatures: surveyDetail.likedFeatures,
        interestedSources: surveyDetail.interestedSources,
        likelihoodRecommendation: surveyDetail.likelihoodRecommendation,
        additionalComments: surveyDetail.additionalComments
      });
    })
  };

  const submitSurvey = () => {
    if (updateSurveyId !== null)
      return apiService.updateSurveyData(updateSurveyId, surveyForm)
      else return apiService.storeSurveyData(surveyForm)
  };

  const onSubmit = () => {
    submitSurvey()
  };

  const onCheckChange = (event: any, type: string) => {
    const value = event.target.value
    setSurveyForm((prevForm: any) => ({
      ...prevForm,
      [type]: event.target.checked
        ? [...prevForm[type], value]
        : prevForm[type].filter((item: any) => item !== value)
    }));
  };

  return (
    <div className="container mt-5">
      <div className="header-box">
        <h1>CS Department Survey</h1>
        <div id="greeting" className="mt-3 mb-3"></div>
      </div>
      <br />
      <form className="form" onSubmit={onSubmit}>
      <div className="form-group" >
        <label htmlFor="firstName">First Name:</label><span className="required">*</span>
        <input type="text" className="form-control" id="firstName" name="firstName" value={surveyForm.firstName} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, firstName: e.target.value}))}} required placeholder="e.g., John" />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label><span className="required">*</span>
        <input type="text" className="form-control" id="lastName" name="lastName" value={surveyForm.lastName} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, lastName: e.target.value}))}} required placeholder="e.g., Doe" />
      </div>
      <div className="form-group">
        <label htmlFor="streetAddress">Street Address:</label>
        <input type="text" className="form-control" id="streetAddress" name="streetAddress" value={surveyForm.streetAddress} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, streetAddress: e.target.value}))}} placeholder="e.g., 123 Main St" required />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" className="form-control" id="city" name="city" value={surveyForm.city} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, city: e.target.value}))}} placeholder="e.g., Anytown" required />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input type="text" className="form-control" id="state" name="state" value={surveyForm.state} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, state: e.target.value}))}} placeholder="e.g., CA" required />
      </div>
      <div className="form-group">
        <label htmlFor="zip">Zip:</label>
        <input type="text" className="form-control" id="zip" name="zip" value={surveyForm.zip} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, zip: e.target.value}))}} placeholder="e.g., 12345" required />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={surveyForm.phoneNumber} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, phoneNumber: e.target.value}))}} placeholder="e.g., 555-1234" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Please enter a valid telephone number in the format XXX-XXXX" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail:</label>
        <input type="email" className="form-control" id="email" name="email" value={surveyForm.email} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, email: e.target.value}))}} placeholder="john.doe@example.com" />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfSurvey">Date of Survey:</label>
        <input type="date" id="dateOfSurvey" name="dateOfSurvey" value={surveyForm.dateOfSurvey} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, dateOfSurvey: e.target.value}))}} required />
      </div>
      <div className="form-group">
        <label htmlFor="likedFeatures">What did you like most about the campus?</label>
        {likedFeaturesOptions.map((feature) => (
          <div key={feature} className="form-check">
            <input type="checkbox" className="form-check-input" id={`likes-${feature}`} name="likedFeatures" checked={surveyForm.likedFeatures.includes(feature)} onChange={(event) => onCheckChange(event, "likedFeatures")} value={feature} />
            <label className="form-check-label" htmlFor={`likes-${feature}`}>{feature}</label><br />
          </div>
        ))}
      </div>
      <div className="form-group">
        <label>How did you become interested in the university?</label>
        {interestedSourcesOptions.map((source) => (
          <div key={source} className="form-check">
            <input type="checkbox" className="form-check-input" id={`interest-${source}`} name="interestedSources" checked={surveyForm.interestedSources.includes(source)} onChange={(event) => onCheckChange(event, 'interestedSources')} value={source} />
            <label className="form-check-label" htmlFor={`interest-${source}`}>{source}</label><br />
          </div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="likelihoodRecommendation">Likelihood of Recommending:</label>
        <select className="form-control" id="likelihoodRecommendation" name="likelihoodRecommendation" value={surveyForm.likelihoodRecommendation} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, likelihoodRecommendation: e.target.value}))}} required>
          <option value="Very Likely">Very Likely</option>
          <option value="Likely">Likely</option>
          <option value="Unlikely">Unlikely</option>
        </select>
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="additionalComments">Additional Comments:</label>
        <br></br>
        <textarea className="form-control" id="additionalComments" name="additionalComments" value={surveyForm.additionalComments} onChange={(e) => {setSurveyForm(prevForm => ({...prevForm, additionalComments: e.target.value}))}} rows={4} />
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary button">Submit</button>
      <button type="reset" className="btn btn-secondary ml-2">Reset</button>
      </form>
    </div>
  );
}

export default SurveyForm;
