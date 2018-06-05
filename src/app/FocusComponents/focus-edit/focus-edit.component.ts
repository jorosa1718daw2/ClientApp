import { Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl } from '@angular/forms';
//import { Focus } from '../../models/focus.model';
import { FocusService } from '../../services/focus.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-focus-edit',
  templateUrl: './focus-edit.component.html',
  styleUrls: ['./focus-edit.component.css']
})

export class FocusEditComponent{

  titulo = this.data.id
  constructor(private _focusService: FocusService, public dialogRef: MatDialogRef<FocusEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
           
               }

  
  formControl = new FormControl('',[
    Validators.required
  ]);
  
  submit(){

  }

  onNoClick(){
    this.dialogRef.close();
  }

  //resolver update no funciona
  editar(){
    this._focusService.UpdateFocus(this.data)
    .subscribe(data =>{
      console.log(data);
    })
  }

  


}
