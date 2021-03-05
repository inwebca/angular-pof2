import { FormatWidth } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
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
  formGroup: FormGroup;
  steps: Step[];

  constructor(
    public dialogRef: MatDialogRef<SurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDriverSurvey,
    private fb: FormBuilder
  ) {}

  get minMax() {
    return this.formGroup.get("minMax") as FormGroup;
  }

  get multipleChoice() {
    return this.formGroup.get("multipleChoice") as FormGroup;
  }

  getType(question): string {
    if (this.isMinMax(question)) return "minMax";
    if (this.isMultipleChoice(question)) return "multipleChoice";
  }

  ngOnInit() {
    this.steps = this.data.questions.map(
      question =>
        ({
          name: question.displayName,
          kind: this.getType(question)
        } as Step)
    );

    this.formGroup = this.fb.group({});

    this.data.questions.forEach(question => {
      if (this.isMinMax(question)) {
        this.formGroup.addControl(
          "minMax",
          this.fb.group({
            min: [question.choosedMin],
            max: [question.choosedMax]
          })
        );
      }
      if (this.isMultipleChoice(question)) {
        this.formGroup.addControl(
          "multipleChoice",
          this.fb.group({
            values: [question.values],
            choices: [question.choices]
          })
        );
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  isMinMax(object: any): object is IMinMaxQuestion {
    return "choosedMin" in object;
  }

  isMultipleChoice(object: any): object is IMultipleChoiceQuestion {
    return "choices" in object;
  }
}

export class Step {
  name: string;
  kind: string;
}
