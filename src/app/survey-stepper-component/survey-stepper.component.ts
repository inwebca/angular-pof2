import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  IChoice,
  IDriverSurvey,
  IMinMaxQuestion,
  IMultipleChoiceQuestion,
  IMultipleNestedChoiceQuestion,
  INestedChoice,
  IQuestion
} from "../services/survey.service";

@Component({
  selector: "survey-stepper-component",
  templateUrl: "./survey-stepper.component.html"
})
export class SurveyStepperComponent implements OnInit {
  @Input() data: IDriverSurvey;
  formGroup: FormGroup;
  steps: Step[];
  constructor(private fb: FormBuilder) {}

  get minMax() {
    return this.formGroup.get("minMax") as FormGroup;
  }

  get multipleChoice() {
    return this.formGroup.get("multipleChoice") as FormGroup;
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
      const typeName = this.getType(question);

      switch (typeName) {
        case "minMax": {
          const minMaxQuestion = question as IMinMaxQuestion;
          this.formGroup.addControl(
            "minMax",
            this.fb.group({
              min: [minMaxQuestion.choosedMin],
              max: [minMaxQuestion.choosedMax]
            })
          );
          break;
        }
        case "multipleChoice": {
          const multipleChoiceQuestion = question as IMultipleChoiceQuestion;
          this.formGroup.addControl(
            "multipleChoice",
            this.fb.group({
              values: [multipleChoiceQuestion.values],
              choices: [multipleChoiceQuestion.choices]
            })
          );
          break;
        }
        case "multipleNestedChoice": {
          const multipleNestedChoiceQuestion = question as IMultipleNestedChoiceQuestion;
          this.formGroup.addControl(
            "multipleNestedChoice",
            this.fb.group({
              values: [multipleNestedChoiceQuestion.values],
              choices: [multipleNestedChoiceQuestion.choices]
            })
          );
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    });
    console.log(this.formGroup);
  }

  getType(question: IQuestion) {
    if ((question as IMinMaxQuestion).choosedMin !== undefined) {
      return "minMax";
    }
    if (
      (question as IMultipleChoiceQuestion | IMultipleNestedChoiceQuestion)
        .values !== undefined
    ) {
      let values = (question as
        | IMultipleChoiceQuestion
        | IMultipleNestedChoiceQuestion).values;

      let nestedChoices = values as INestedChoice[];

      if (nestedChoices[0].children !== undefined) {
        return "multipleNestedChoice";
      }
      return "multipleChoice";
    }
  }
}

export class Step {
  name: string;
  kind: string;
}
