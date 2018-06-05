import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentAnalogData } from '../models/currentanalogdata.model';
import { Sensor } from '../models/sensor.model';
import { Observable } from 'rxjs';

////http://localhost:63026/api/sensor/1/historicalanalogdata/2017-11-01/2017-12-25


@Injectable()
export class CurrentSensorDataService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost:63026/';
  }

  getHistotiricalData(id,fechaInicio,fechaFinal): Observable<Sensor[]>{
    return this.http.get<Sensor[]>(this.baseUrl + 'api/sensor/'+id+'/historicalanalogdata/'+fechaInicio+'/'+fechaFinal);
  }

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.baseUrl + 'api/Sensor');
  }

  getSensorsById(sensorId: number): Observable<Sensor[]>{
    return this.http.get<Sensor[]>(this.baseUrl + 'api/Sensor/' +sensorId);
  }

  deleteSensor(sensorId: number): Observable<Sensor[]>{
    return this.http.delete<Sensor[]>(this.baseUrl + 'api/Sensor/' +sensorId);
  }
  saveSensor(analyzerId){
    return this.http.post(this.baseUrl + 'api/Sensor', analyzerId);
  }





  getData(sensorId: number): Observable<CurrentAnalogData> {
    return this.http.get<CurrentAnalogData>(this.baseUrl + 'api/Sensor/' + sensorId + '/CurrentAnalogData')
  }
}
