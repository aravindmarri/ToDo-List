import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskData} from '../../task-data';

@Component({
  selector: 'app-conform-clear',
  templateUrl: './conform-clear.component.html',
  styleUrls: ['./conform-clear.component.scss']
})
export class ConformClearComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    public dialogRef: MatDialogRef<ConformClearComponent>,
    @Inject(MAT_DIALOG_DATA) public taskdata: TaskData) {}
  addTask(): void{
    // this.addItem(this.name, this.check, this.flagValue);
    // this.newItemEvent.emit(value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
