import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
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
  formChoices: DriverSurveyChoices;
  steps: Step[];
  readonly ControlType = ControlType;
  constructor(private fb: FormBuilder) {}

  getGroup(questionId: number) {
    return this.formGroup.controls[questionId] as FormGroup;
  }

  ngOnInit() {
    this.formChoices = {
      id: this.data.id,
      minMaxChoices: [],
      multipleChoices: []
    };
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

    Object.keys(this.formGroup.controls).forEach(key => {
      const group = this.formGroup.controls[key] as FormGroup;
      if (group.contains("min")) {
        this.formChoices.minMaxChoices.push({
          id: parseInt(key),
          min: group.get("min").value,
          max: group.get("max").value
        });
      }
      if (group.contains("choices")) {
        this.formChoices.multipleChoices.push({
          id: parseInt(key),
          choice: group.get("choices").value
        });
      }
    });
    console.log(this.formChoices);

    this.formGroup.valueChanges.subscribe(values => {
      debugger;
      const test = <Array<any>>values;
      debugger;
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

export interface DriverSurveyChoices {
  id: number;
  multipleChoices: Array<MultipleChoice>;
  minMaxChoices: Array<MinMaxChoice>;
}

export interface MultipleChoice {
  id: number;
  choice: Array<number>;
}

export interface MinMaxChoice {
  id: number;
  min: number;
  max: number;
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
