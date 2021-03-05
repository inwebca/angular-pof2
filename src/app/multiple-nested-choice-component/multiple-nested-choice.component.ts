import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "multiple-nested-choice-component",
  templateUrl: "./multiple-nested-choice.component.html"
})
export class MultipleNestedChoiceComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() question: string;

  get values() {
    return this.group.get("values").value;
  }

  ngOnInit() {}
}
