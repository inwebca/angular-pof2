import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SurveyService {
  public driverSurveys(): Observable<IDriverSurvey[]> {
    let driverSurveysArray: Array<IDriverSurvey> = [
      {
        id: 1,
        startDate: "2021-01-01",
        endDate: "2021-02-01",
        savedDate: "2021-01-01",
        driver: { id: 1, name: "Test" },
        questions: []
      },
      {
        id: 2,
        startDate: "2022-01-01",
        endDate: "2022-02-01",
        savedDate: "2022-01-01",
        driver: { id: 2, name: "Test 2" },
        questions: []
      }
    ];

    return of(driverSurveysArray);
  }

  public driverSurvey(id: number): Observable<IDriverSurvey> {
    let survey: IDriverSurvey = {
      id: 1,
      startDate: "2021-01-01",
      endDate: "2021-02-01",
      savedDate: "2021-01-01",
      driver: { id: 1, name: "Test" },
      questions: [
        {
          id: 1,
          displayName: "Question min max 1",
          choosedMin: 1,
          choosedMax: 2
        } as IMinMaxQuestion,
        {
          id: 2,
          displayName: "Question min max 2",
          choosedMin: 2,
          choosedMax: 3
        } as IMinMaxQuestion,
        {
          id: 3,
          displayName: "Question 2",
          choices: [1],
          values: [
            {
              value: 1,
              name: "US"
            },
            {
              value: 2,
              name: "Canada"
            }
          ]
        } as IMultipleChoiceQuestion,
        {
          id: 4,
          displayName: "Question 3",
          choices: [123, 789],
          values: [
            {
              value: 1,
              name: "EastCoast",
              children: [
                { value: 123, name: "New York" },
                { value: 456, name: "New Jersey" }
              ]
            },
            {
              value: 2,
              name: "SouthWest",
              children: [
                { value: 789, name: "California" },
                { value: 999, name: "Arizona" }
              ]
            }
          ]
        } as IMultipleNestedChoiceQuestion
      ]
    };

    return of(survey);
  }
}

export interface IDriverSurvey {
  id: number;
  startDate: string;
  endDate: string;
  savedDate: string;
  driver: IDriver;
  questions: Array<IQuestion>;
}

export interface IQuestion {
  id: number;
  displayName: string;
}

export interface IDriver {
  id: number;
  name: string;
}

export interface IMinMaxQuestion extends IQuestion {
  id: number;
  displayName: string;
  choosedMin: number;
  choosedMax: number;
}

export interface IMultipleChoiceQuestion extends IQuestion {
  id: number;
  displayName: string;
  choices: Array<number>;
  values: Array<IChoice>;
}

export interface IMultipleNestedChoiceQuestion extends IQuestion {
  id: number;
  displayName: string;
  choices: Array<number>;
  values: Array<INestedChoice>;
}

export interface IChoice {
  value: number;
  name: string;
}

export interface INestedChoice {
  value: number;
  name: string;
  children: Array<INestedChoice>;
}
