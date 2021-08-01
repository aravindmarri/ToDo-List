import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskData} from '../../task-data';

@Component({
  selector: 'app-conform-clear',
  templateUrl: './conform-clear.component.html',
  styleUrls: ['./conform-clear.component.scss']
})
export class ConformClearComponent implements OnInit {

  // constructor(
  //   public confomrdialogRef: MatDialogRef<ConformClearComponent>,
  //   @Inject(MAT_DIALOG_DATA) public buttonVal: ture) {}
  // TODO COnfigure the dialoge content
  ngOnInit(): void {
  }

}
