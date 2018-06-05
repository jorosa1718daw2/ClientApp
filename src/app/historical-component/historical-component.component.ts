import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { FocusService } from "../services/focus.service";
import { AnalyzerService } from "../services/analyzer.service";
import { MeasuringComponentService } from "../services/measuring-component.service";
import { CurrentSensorDataService } from "../services/current-sensor-data.service";

import { HttpClient } from '@angular/common/http';
import { Focus } from "../models/focus.model";
import { Sensor } from "../models/sensor.model"
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import * as moment from 'moment';


//http://localhost:63026/api/sensor/1/historicalanalogdata/2017-11-01/2017-12-25

@Component({
  selector: 'app-historical-component',
  templateUrl: './historical-component.component.html',
  styleUrls: ['./historical-component.component.css']
})
export class HistoricalComponent implements OnInit {
  csvFile;
  dataJSON;
  dataId;
  dataToCsv;
  measurings;
  focuses;
  focus;
  focoSeleccionado: string;
  focoDescripcionSeleccionado: string
  measuringSeleccionado: string;
  dataSensor;
  sensorId;
  isSelected: boolean = false;
  fechaInicio;
  fechaFinal;
  constructor(private _sensorService: CurrentSensorDataService, private _measurinService: MeasuringComponentService, private _analyzerService: AnalyzerService, private _focusService: FocusService, public http: HttpClient) {

  }

  ngOnInit() {
    this.getAllFocus();
    // this.getMeasuringComponents();
  }

  getAllFocus() {
    this._focusService.getData()
      .subscribe(data => {
        this.dataJSON = data;
        if (this.isSelected == true) {
        this.focoIdSeleccionado();
        }

      })
  }
  focoIdSeleccionado() {
   
      this._focusService.getFocusById(this.focoSeleccionado)
        .subscribe(data => {
          this.focus = data;
          this.focus.analyzers.forEach(a => {
            a.sensors.forEach(s => {
              this.sensorId = s.sensorId;
              console.log(s.measuringComponent.name);
              this.measuringSeleccionado = s.measuringComponent.name;
            });
          });

        });
  }
  
  getMeasuringComponents() {
    this._measurinService.getData()
      .subscribe(data => {
        this.measurings = data;
      })
  }
  historicalData() {
    let fInicio = moment(this.fechaInicio).format('YYYY-MM-DD');
    let fFinal = moment(this.fechaFinal).format('YYYY-MM-DD');
    console.log(this.sensorId, fInicio, fFinal);
    this._sensorService.getHistotiricalData(this.sensorId, fInicio, fFinal)
      .subscribe(data => {
        this.dataJSON = data;
        this.dataToCsv = this.dataJSON.map(i => {
          return {
            time: i.timeStamp,
            value: i.value,
            status: i.statusCode,
            samples: i.samples
          };
        });

      })
  }


  generarCSVApi() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: this.focus.description,
      useBom: true,
      headers: ["Time stamp", this.measuringSeleccionado, "Status code", "Samples"]
    };
    this.csvFile = new Angular5Csv(this.dataToCsv, 'HistoricalData', options);
  }

}
