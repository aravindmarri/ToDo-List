import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskData } from 'src/app/task-data';

export interface DialogData {
  name: string;
  description: string;
}
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    public dialogRef: MatDialogRef<AddtaskComponent>,
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
