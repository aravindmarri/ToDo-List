import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ButtonVal} from '../../task-data';
import {DialogData} from '../addtask/addtask.component';

@Component({
  selector: 'app-conform-clear',
  templateUrl: './conform-clear.component.html',
  styleUrls: ['./conform-clear.component.scss']
})
export class ConformClearComponent implements OnInit {

  constructor(
    public confomrdialogRef: MatDialogRef<ConformClearComponent>,
    @Inject(MAT_DIALOG_DATA)  public eraseAll = true) {}
  ngOnInit(): void {
  }
  eraseAllFunction(): void {

  }
  onNoClick(): void {
    this.confomrdialogRef.close();
  }
}
