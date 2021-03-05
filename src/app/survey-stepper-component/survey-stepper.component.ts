import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
  readonly ControlType = ControlType;
  constructor(private fb: FormBuilder) {}

  get minMax() {
    return this.formGroup.get("minMax") as FormGroup;
  }

  get multipleChoice() {
    return this.formGroup.get("multipleChoice") as FormGroup;
  }

  get multipleNestedChoice() {
    return this.formGroup.get("multipleNestedChoice") as FormGroup;
  }

  get form() {
    return this.formGroup.get("form") as FormArray;
  }
  get minMaxArray() {
    return this.formGroup.get("minMaxArray") as FormArray;
  }
  get multipleChoicesArray() {
    return this.formGroup.get("multipleChoicesArray") as FormArray;
  }

  getGroup(questionId) {
    return this.formGroup.controls[questionId] as FormGroup;
  }

  ngOnInit() {
    this.steps = this.data.questions.map(
      question =>
        ({
          questionId: question.id,
          name: question.displayName,
          controlType: this.getType(question)
        } as Step)
    );

    let groups = this.createFormGroup(this.data.questions);
    this.formGroup = new FormGroup(groups);

    this.data.questions.forEach(question => {
      const typeName = this.getType(question);

      // switch (typeName) {
      //   case "minMax": {
      //     const minMaxQuestion = question as IMinMaxQuestion;
      //     this.formGroup.addControl(
      //       "minMax",
      //       this.fb.group({
      //         min: [minMaxQuestion.choosedMin],
      //         max: [minMaxQuestion.choosedMax]
      //       })
      //     );
      //     break;
      //   }
      //   case "multipleChoice": {
      //     const multipleChoiceQuestion = question as IMultipleChoiceQuestion;
      //     this.formGroup.addControl(
      //       "multipleChoice",
      //       this.fb.group({
      //         values: [multipleChoiceQuestion.values],
      //         choices: [multipleChoiceQuestion.choices]
      //       })
      //     );
      //     break;
      //   }
      //   case "multipleNestedChoice": {
      //     const multipleNestedChoiceQuestion = question as IMultipleNestedChoiceQuestion;
      //     this.formGroup.addControl(
      //       "multipleNestedChoice",
      //       this.fb.group({
      //         values: [multipleNestedChoiceQuestion.values],
      //         choices: [multipleNestedChoiceQuestion.choices]
      //       })
      //     );
      //     break;
      //   }
      //   default: {
      //     //statements;
      //     break;
      //   }
      // }
    });
  }

  getType(question: IQuestion) {
    if ((question as IMinMaxQuestion).choosedMin !== undefined) {
      return ControlType.MinMax;
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
        return ControlType.MultipleNestedChoice;
      }
      return ControlType.MultipleChoice;
    }
  }

  createFormGroup(questions: IQuestion[]) {
    const group: any = {};
    questions.forEach(question => {
      switch (this.getType(question)) {
        case ControlType.MinMax: {
          const minMaxQuestion = question as IMinMaxQuestion;
          group[question.id] = this.fb.group({
            min: minMaxQuestion.choosedMin,
            max: minMaxQuestion.choosedMax
          });
          break;
        }
        case ControlType.MultipleChoice: {
          const multipleChoiceQuestion = question as IMultipleChoiceQuestion;
          group[question.id] = this.fb.group({
            values: [multipleChoiceQuestion.values],
            choices: [multipleChoiceQuestion.choices]
          });
          break;
        }
        case ControlType.MultipleNestedChoice: {
          const multipleChoiceQuestion = question as IMultipleChoiceQuestion;
          group[question.id] = this.fb.group({
            values: [multipleChoiceQuestion.values],
            choices: [multipleChoiceQuestion.choices]
          });
          break;
        }
      }
    });
    return group;
  }
}

export class Step {
  questionId: number;
  name: string;
  controlType: ControlType;
}

export enum ControlType {
  MinMax,
  MultipleNestedChoice,
  MultipleChoice
}
