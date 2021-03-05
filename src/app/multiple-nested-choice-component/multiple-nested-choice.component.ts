import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "multiple-nested-choice-component",
  templateUrl: "./multiple-nested-choice.component.html"
})
export class MultipleNestedChoiceComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() question: string;
  groups: any[] = [];
  items: any[] = [];

  get values() {
    return this.group.get("values").value;
  }

  ngOnInit() {
    for (let group of this.values) {
      this.groups.push(group);
      for (let item of group.children) {
        this.items.push(item.value);
      }
    }
    console.log(this.values);
  }
}
