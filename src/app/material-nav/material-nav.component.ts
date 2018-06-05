import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { FocusComponent } from "../FocusComponents/focus/focus.component";
import { FocusService } from "../services/focus.service";
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

@Component({
  selector: "app-nav",
  templateUrl: "./material-nav.component.html",
  styleUrls: ["./material-nav.component.css"]
})
export class MaterialNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  constructor(private breakpointObserver: BreakpointObserver) {}
}
