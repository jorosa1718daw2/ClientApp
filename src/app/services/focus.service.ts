import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Focus } from '../models/focus.model';
import { Analyzer } from '../models/analyzer.model';
import { BehaviorSubject, Observable } from 'rxjs';




@Injectable()
export class FocusService {
  baseUrl: string;
  analyzers: Analyzer[];
  focusId: number;
  private focuses: Focus[];
  dataChange: BehaviorSubject<Focus[]> = new BehaviorSubject<Focus[]>([]);
  dialogData: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost:63026/';

  }
  get data(): Focus[] {
    return this.dataChange.value;
  }

  getAllFocus(): void {
    this.http.get<Focus[]>(this.baseUrl + 'api/Focus')
      .subscribe(data =>{
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        });
  }

  getData(): Observable<Focus[]> {
    return this.http.get<Focus[]>(this.baseUrl + 'api/Focus');
  }


  getFocusById(focusId): Observable<Focus[]> {
    return this.http.get<Focus[]>(this.baseUrl + 'api/Focus/' + focusId);
  }


  saveFocus(focus: any) {
    return this.http.post(this.baseUrl + 'api/Focus/Create', focus)
  }

  getDialogData(){
    return this.dialogData;
  }



  UpdateFocus(focusId) {
    return this.http.put(this.baseUrl + 'api/Focus/', + focusId);

  }

  deleteFocus(focusId): Observable<Focus[]> {
    return this.http.delete<Focus[]>(this.baseUrl + 'api/Focus/' + focusId);
  }

}
