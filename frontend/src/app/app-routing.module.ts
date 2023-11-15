import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySurveysComponent } from './display-surveys/display-surveys.component';
import { SurveyComponent } from './survey/survey.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent},
  { path: 'survey', component: SurveyComponent },
  { path: 'retrieve', component: DisplaySurveysComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
