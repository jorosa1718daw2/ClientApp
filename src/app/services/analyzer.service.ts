import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analyzer } from '../models/analyzer.model';
import { Focus } from '../models/focus.model';

@Injectable()
export class AnalyzerService {
  baseUrl: string;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost:63026/';
  }

  getData(): Observable<Analyzer[]> {
    return this.http.get<Analyzer[]>(this.baseUrl + 'api/Analyzer');
  }

  getAnalyzerById(analyzerId): Observable<Analyzer[]>{
    return this.http.get<Analyzer[]>(this.baseUrl + 'api/Analyzer/' + analyzerId);
  }
  getAnlayzerFocusId(focusId): Observable<Analyzer[]>{
    return this.http.get<Analyzer[]>(this.baseUrl + 'api/Analyzer/focus/' + focusId);
  }




  saveAnalyzer(analyzer :any){
    return this.http.post(this.baseUrl + 'api/Analyzer', analyzer);
  }


  
  UpdateAnalyzer(model) {
    return this.http.put(this.baseUrl + 'api/Analyzer/', model);
  }

  deleteAnalyzer(analyzerId): Observable<Analyzer[]> {
    return this.http.delete<Analyzer[]>(this.baseUrl + 'api/Analyzer/' + analyzerId);
  }


}
