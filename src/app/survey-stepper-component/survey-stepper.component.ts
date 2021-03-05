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
          kind: this.getType(question),
          kind2: this.determineIfIsAnimalOrHuman(question)
        } as Step)
    );

    console.log(this.steps);

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

  getType(question): string {
    if (this.isMinMax(question)) return "minMax";
    if (this.isMultipleChoice(question)) return "multipleChoice";
  }

  isMinMax(object: any): object is IMinMaxQuestion {
    return "choosedMin" in object;
  }

  isMultipleChoice(object: any): object is IMultipleChoiceQuestion {
    if ("values" in object) {
      return "values" in object;
    }
    return "choices" in object;
  }

  isMultipleNestedChoice(object: any): object is IMultipleNestedChoiceQuestion {
    return "choices" in object;
  }

  determineIfIsAnimalOrHuman(question: IQuestion) {
    debugger;
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
      let choices = values as IChoice[] | INestedChoice[];
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
