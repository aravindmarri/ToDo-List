import {Component, Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from './addtask/addtask.component';
import {TaskData} from '../task-data';
import {NewTaskService} from '../new-task.service';
import firebase from 'firebase';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss'],
})

@Injectable()
export class TodoEntryComponent implements OnInit {
  taskRef: AngularFireList<any>;
  scoreRef: AngularFireList<any>;
  items: TaskData[] = [];
  score: Observable<any[]>;
  scoreKey = '-MfNAwF9PQQS9-bZftNi';
  todoForm: any;
  description = '';
  name = '';
  check = false;
  taskTry = false;
  displayTry = false;
  stopDisplayTry = false;
  backTransform = true;
  color = '#aa4465';
  newTaskName = '';
  newTaskDescription = '';
  todayString: string = new Date().toDateString();
  leftIndex = 1000;
  rightIndex = 1000;
  private db: any;

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.taskRef = db.list('/Tasks');
    this.scoreRef = db.list('score');
    // Use snapshotChanges().map() to store the key
    this.taskRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.items = data;
    });
    this.score = this.scoreRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskDescription: string, todayString: string): void {
    this.taskRef.push({name: taskName, description: taskDescription, check: false, compareCheck: false, date: todayString});
    this.scoreRef.update(this.scoreKey, {totalTasks: (firebase.database.ServerValue.increment(1))});
  }

  submit(): void {
    this.taskTry = true;
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '250px',
      data: {name: this.newTaskName, description: this.newTaskDescription}
    });

    dialogRef.afterClosed().subscribe(newData => {
      this.addItem(newData.name, newData.description, this.todayString);
    });
  }

  checkChange(index: number, key: string, isCheck: boolean, compareCheck: boolean, scoreKey: any, score: number, tasksDone: number): void {
    const checkVal = !isCheck;
    let completedTasks = tasksDone;
    let addScore = score;
    if (addScore >= 100) {
      addScore = 0;
    }
    else if (checkVal && !compareCheck){
      completedTasks += 1;
      addScore = score + 2;
    }
    this.taskRef.update(key, {check: checkVal, compareCheck: true});
    this.scoreRef.update(scoreKey, {scoreVal: addScore, tasksDone: completedTasks});
    console.log(checkVal);
    this.backTransform = false;
    this.styleObject(index);
  }

  ngOnInit(): void {
    this.db.doc().delete();
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

  panleft(currentIndex: number, evt: any): void {
    this.leftIndex = currentIndex;
    this.backTransform = true;
  }

  panright(currentIndex: number, evt: any): void {
    this.rightIndex = currentIndex + 1001;
    this.styleObject(currentIndex + 1001);
    this.backTransform = false;
  }

  styleObject(currentIndex: number): object | any {
    if (this.leftIndex === currentIndex && this.backTransform) {
      return {transform: 'translate3d(-64px, 0px, 0px)'};
    } else {
      return {transform: 'translate3d(0px, 0px, 0px)'};
    }
  }

  delete(index: any, key: any, isCheck: boolean, scoreKey: any, score: number): void {
    let decScore = score;
    if (decScore >= 100) {
      if (isCheck) {
        decScore = score + 1;
      } else {
        decScore = score - 3;
      }
    } else {
      decScore = 0;
    }
    this.taskRef.remove(key);
    this.scoreRef.update(scoreKey, {scoreVal: decScore});
    this.backTransform = false;
  }

}
//TODO need to work on after deleteing percentage is getting decresing need to check once!
