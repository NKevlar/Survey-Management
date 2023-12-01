import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Welcome.css"

function Welcome() {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const excludeWelcomePaths = ['/survey', '/retrieve', '/update'];
    setShowWelcome(!excludeWelcomePaths.some(path => new RegExp(path).test(location.pathname)));
  }, []);

  return (
  <div className={showWelcome ? "container" : "hidden"}>
    <div className="padded-row">
      <br />
      <div className="cs-logo w3-display-middle">
        <h1 className="gmu-heading">
          <Link to="/" className="img-link">
            <img className="img-logo img-height" src="https://cs.gmu.edu/static/images/logo.png" alt="GMU CS Department" />
          </Link>
        </h1>
      </div>
    </div>
    <br /><br />
    <p>
      The graduate program in Computer Science readies students for careers in computer science and related technology research and professional practice. This program encompasses a comprehensive curriculum that covers fundamental and advanced topics in various fields, including artificial intelligence and databases, programming languages and software engineering, systems and networks, theoretical computer science, and visual computing. Graduate courses are categorized into two groups: basic courses, which do not require prior completion of a graduate-level course, and advanced courses, which necessitate prior completion of a graduate course. Typically, graduate courses are scheduled during the late afternoon and evening to accommodate working professionals. Financial assistance, in the form of graduate assistantships, may be accessible to full-time degree-seeking students.
    </p>
    <span className="survey-p">
      <Link to="/survey" className="a-tag">Please fill out the student survey form here</Link>
    </span>
    <br />
    <span className="survey-p">
      <Link to="/retrieve" className="a-tag">Get all survey info here</Link>
    </span> 
  </div>)
}

export default Welcome;