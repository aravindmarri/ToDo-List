import {Component, Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {query, style, transition, trigger, stagger, animate} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from './addtask/addtask.component';
import {TaskData} from 'src/app/task-data';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss'],
  animations: []
})

@Injectable()
export class TodoEntryComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  todoForm: any;
  description = '';
  name = '';
  check = false;
  taskTry = false;
  displayTry = false;
  stopDisplayTry = false;
  flagValue = false;
  color = '#aa4465';
  flagName = 'star_border';
  newTaskName = '';
  newTaskDescription = '';

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.itemsRef = db.list('Tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskDescription: string): void {
    this.itemsRef.push({name: taskName, description: taskDescription, check: false, flag: false});
  }

  submit(): void {
    this.taskTry = true;
    console.log(this.taskTry);
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '250px',
      data: {name: this.newTaskName, description: this.newTaskDescription}
    });

    dialogRef.afterClosed().subscribe(newData => {
      this.addItem(newData.name, newData.description);
    });
  }

  checkChange(key: string, isCheck: boolean): void {
    this.itemsRef.update(key, {check: !isCheck});
  }

  flagChange(key: string, isCheck: boolean): void {
    setTimeout(() => {
      this.itemsRef.update(key, {flag: !isCheck});
    }, 100);
  }

  ngOnInit(): void {
    this.renderCounter();
  }

  renderCounter(): void {
    setTimeout(
      () => {
        if (!this.taskTry) {
          this.displayTry = !this.displayTry;
          this.stopDisplayTry = true;
          this.taskTry = !this.taskTry;
        }
      }, 10000);
    setTimeout(
      () => {
        if (this.stopDisplayTry && this.displayTry && this.taskTry) {
          this.displayTry = !this.displayTry;
        }
      }, 30000);
  }
}
