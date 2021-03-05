import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  IDriverSurvey,
  IMinMaxQuestion,
  IMultipleChoiceQuestion,
  IQuestion,
  SurveyService
} from "../services/survey.service";

@Component({
  selector: "survey-dialog-component",
  templateUrl: "./survey-dialog.component.html"
})
export class SurveyDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDriverSurvey
  ) {}

  ngOnInit() {}

  onClose(): void {
    this.dialogRef.close();
  }
}
