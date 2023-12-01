import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import SurveyForm from './components/SurveyForm';
import DisplaySurveys from './components/DisplaySurveys';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/survey" element={<SurveyForm/>} />
        <Route path="/survey/:id" element={<SurveyForm/>} />
        <Route path="/retrieve" element={<DisplaySurveys/>} />
        <Route path="/" element={<Welcome/>} />
      </Routes>
    </Router>
  );
}

export default App;
