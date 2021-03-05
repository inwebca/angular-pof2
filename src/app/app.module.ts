import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SurveyComponent } from "./survey-component/survey.component";
import { MultipleChoiceComponent } from "./multiple-choice-component/multiple-choice.component";
import { MinMaxComponent } from "./min-max-component/min-max.component";
import { SurveyDialogComponent } from "./survey-dialog-component/survey-dialog.component";
import { SurveyStepperComponent } from "./survey-stepper-component/survey-stepper.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    SurveyComponent,
    MultipleChoiceComponent,
    MinMaxComponent,
    SurveyDialogComponent,
    SurveyStepperComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
