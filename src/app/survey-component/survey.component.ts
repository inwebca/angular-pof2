import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { IDriverSurvey, SurveyService } from "../services/survey.service";
import { SurveyDialogComponent } from "../survey-dialog-component/survey-dialog.component";

@Component({
  selector: "survey-component",
  templateUrl: "./survey-component.html"
})
export class SurveyComponent implements OnInit {
  driverSurveys$: Observable<IDriverSurvey[]>;
  constructor(private surveyService: SurveyService, public dialog: MatDialog) {}

  ngOnInit() {
    this.driverSurveys$ = this.surveyService.driverSurveys();
  }

  onClick(surveyId: number) {
    const survey$ = this.surveyService.driverSurvey(surveyId);
    survey$.subscribe(survey => {
      this.dialog.open(SurveyDialogComponent, {
        width: "500px",
        height: "500px",
        data: survey
      });
    });
  }
}
