export interface Survey {
    id?: number; 
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;
    dateOfSurvey: string;
    likedFeatures: string[];
    interestedSources: string[];
    likelihoodRecommendation: string;
    additionalComments: string;
  }
  