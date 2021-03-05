import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IQuestion } from "../services/survey.service";
@Component({
  selector: "min-max-component",
  templateUrl: "./min-max.component.html"
})
export class MinMaxComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() question: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const test = this.group.get("values");
    console.log(test);
  }
}
