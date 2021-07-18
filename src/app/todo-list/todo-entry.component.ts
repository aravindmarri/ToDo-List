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
  color = '#aa4465';
  newTaskName = '';
  newTaskDescription = '';
  todayString: string = new Date().toDateString();

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.itemsRef = db.list('Tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskDescription: string, todayString: string): void {
    this.itemsRef.push({name: taskName, description: taskDescription, check: false, date: todayString});
  }

  submit(): void {
    this.taskTry = true;
    console.log(this.taskTry);
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '250px',
      data: {name: this.newTaskName, description: this.newTaskDescription}
    });

    dialogRef.afterClosed().subscribe(newData => {
      this.addItem(newData.name, newData.description, this.todayString);
    });
  }

  checkChange(key: string, isCheck: boolean): void {
    this.itemsRef.update(key, {check: !isCheck});
  }

  ngOnInit(): void {
    this.renderCounter();
    this.setDate();
  }
  setDate(): void {
    console.log(this.todayString);
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
