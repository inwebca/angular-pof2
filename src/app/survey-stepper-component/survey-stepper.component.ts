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

  getGroup(i) {
    debugger;
    this.formGroup[i] as FormGroup;
    return this.formGroup[i] as FormGroup;
  }

  ngOnInit() {
    this.steps = this.data.questions.map(
      question =>
        ({
          name: question.displayName,
          kind: this.getType(question)
        } as Step)
    );

    this.formGroup = this.fb.group({
      // minMaxArray: this.fb.array([]),
      // multipleChoicesArray: this.fb.array([])
    });

    let groups = this.createFormGroup(this.data.questions);
    console.log(groups);

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

  createFormGroup(questions: IQuestion[]) {
    const group: any = {};

    questions.forEach(question => {
      const typeName = this.getType(question);
      if (typeName === "minMax") {
        const minMaxQuestion = question as IMinMaxQuestion;
        group[question.id] = this.fb.group({
          min: minMaxQuestion.choosedMin,
          max: minMaxQuestion.choosedMax
        });
      }
      if (typeName === "multipleChoice") {
        const multipleChoiceQuestion = question as IMultipleChoiceQuestion;
        group[question.id] = this.fb.group({
          values: [multipleChoiceQuestion.values],
          choices: [multipleChoiceQuestion.choices]
        });
      }
      if (typeName === "multipleNestedChoice") {
        const multipleNestedChoiceQuestion = question as IMultipleNestedChoiceQuestion;
        group[question.id] = this.fb.group({
          values: [multipleNestedChoiceQuestion.values],
          choices: [multipleNestedChoiceQuestion.choices]
        });
      }
    });
    return group;
  }
}

export class Step {
  name: string;
  kind: string;
}
