
import { Component, Inject, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FocusService } from '../../services/focus.service';
import { Output } from '@angular/core/src/metadata/directives';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { FocusAddComponent } from '../focus-add/focus-add.component';
import { FocusEditComponent } from '../focus-edit/focus-edit.component';


@Component({
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.scss']

})
export class FocusComponent implements OnInit {

  public focus: Focus[];
  public a_list: Analyzer[];
  title = 'Ver Focos de emisiones';
  displayedColumns = ['name', 'description', 'analyzers', 'actions'];
  interval: any;
  dataSource: ValueDataSource;
  id: number;
  index: number;

  constructor(private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, public http: HttpClient,
    private _router: Router, private _focusService: FocusService) { }



  ngOnInit(): void {
    this.CargarFocos();
    // this.interval = setInterval(() => {
    // this.CargarFocos();
    // }, 5000);
  }

  refrescar() {
    this.CargarFocos();
  }


  nuevoFoco(foco: Focus) {
    const dialogRef = this.dialog.open(FocusAddComponent, {
      data: { foco: foco }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 1) {
          this.refrescar();
        }
      });

  }
  editarFoco(i: number, id: number, name: string, description: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialog.open(FocusEditComponent, {
      data: {
        id: id, name: name, description: description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.refrescar();
        }
      });
  }


  CargarFocos() {
    this._focusService.getData()
      .subscribe(data => {
        console.log(data);
        this.focus = data;
        this.dataSource = new ValueDataSource(this.focus);
      });
  }
}

class ValueDataSource {
  constructor(private focus: Focus[]) { }

  connect(): Observable<Focus[]> {
    return of(this.focus);
  }
  disconnect() { }
}

export interface Analyzer {
  manufacturer: string;
  model: string;
  serialNumber: string;
}


export interface Focus {
  focusId: number;
  name: string;
  description: string;
  analyzers: Analyzer[];
}
