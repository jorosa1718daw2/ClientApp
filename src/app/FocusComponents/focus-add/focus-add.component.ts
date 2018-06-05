import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, FormBuilder, FormGroup, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Focus } from '../../models/focus.model';
import { Analyzer } from '../../models/analyzer.model';
import { FocusService } from '../../services/focus.service';
import { AnalyzerService } from "../../services/analyzer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//SnackBar temporal
import { MatSnackBar,  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material';

@Component({
  selector: 'app-focus-add',
  templateUrl: './focus-add.component.html',
  styleUrls: ['./focus-add.component.css']
})
export class FocusAddComponent implements OnInit {
  isLinear = true;
  isFocusSaved = false;
  isAnalyzerSaved = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  formControl: any;
  data: {};
  focusdata;
  analyzer: {};
  //focus
  name;
  description;
  //analyzer
  manufacturer;
  model;
  serialNumber;
  constructor(private analyzerService: AnalyzerService, private _formBuilder: FormBuilder, public snackbar: MatSnackBar, public dialogRef: MatDialogRef<FocusAddComponent>, @Inject(MAT_DIALOG_DATA) public _data: any,
    public _focusService: FocusService) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  submit() {

  }

  Error() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('name') ? 'Nombre no válido' : '';
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  saveFocus() {
    this.data = {
      name: this.name,
      description: this.description
    }
    this._focusService.saveFocus(this.data).subscribe(data => {
      this.isFocusSaved = true;
      console.log('foco guardado!');
      console.log(data);
      this.focusdata = data;
      console.log('ID del foco');
      console.log(this.focusdata.focusId);
      this.openSnackBar();

    })
  }

  //snackBar config temporal, tendrá un service
  message: string = 'Foco guardado correctamente'
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(){
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackbar.open(this.message,this.action ? this.actionButtonLabel: undefined,config)
   
  }
  saveAnalyzer() {
    this.analyzer = {
      focusId: this.focusdata.focusId,
      manufacturer: this.manufacturer,
      model: this.model,
      serialNumber: this.serialNumber,
    }

    this.analyzerService.saveAnalyzer(this.analyzer).subscribe(data => {
      this.isAnalyzerSaved = true;
      console.log('analizador guardado!');
      console.log(data)
    })
  }

  ok() {
    this._focusService.getAllFocus();
  }





}
