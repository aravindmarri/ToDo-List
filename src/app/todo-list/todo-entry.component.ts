import {Component, Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from './addtask/addtask.component';
import {Score, TaskData} from '../task-data';
import firebase from 'firebase/app';
import {ConformClearComponent} from './conform-clear/conform-clear.component';

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
  score: Observable<Score[]>;
  scoreKey = '-MfNAwF9PQQS9-bZftNi';
  todoForm: any;
  description = '';
  name = '';
  check = false;
  taskTry = false;
  displayTry = false;
  stopDisplayTry = false;
  backTransform = true;
  newTaskName = '';
  eraseAll = true;
  newTaskDescription = '';
  todayString: string = new Date().toString() ;
  leftIndex = 1000;
  rightIndex = 1000;
  availableTask = false;
  eraseFAB = false;
  zeroVal = 0;
  taskVal: Observable<TaskData[]>;

  constructor(db: AngularFireDatabase, public dialog: MatDialog, public confomrdialogRef: MatDialog) {
    this.taskRef = db.list('Tasks');
    this.scoreRef = db.list('score');
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
    this.taskVal = this.taskRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskDescription: string, todayString: string): void {
    this.updateDate();
    this.taskRef.push({name: taskName, description: taskDescription, check: false, compareCheck: false, date: todayString});
    this.scoreRef.update(this.scoreKey, {totalTasks: (firebase.database.ServerValue.increment(1))}).then();
  }

  openAddTaskDialog(): void {
    this.taskTry = true;
    const dialogRef = this.dialog.open(AddtaskComponent, {
      width: '250px',
      data: {name: this.newTaskName, description: this.newTaskDescription}
    });

    dialogRef.afterClosed().subscribe(newData => {
      this.addItem(newData.name, newData.description, this.todayString);
    });
  }
  conformClearDialog(): void{
    const confomrdialogRef = this.dialog.open(ConformClearComponent, {
      width: '250px',
      data: {eraseAll: this.eraseAll}
    });
    confomrdialogRef.afterClosed().subscribe(newData => {
      this.eraseData(newData.eraseAll);
    });
  }
  eraseData(erase: boolean): void{
    if (erase){
      this.taskRef.remove();
      this.zeroScore();
    }
  }
  checkChange(index: number, key: string, isCheck: boolean, compareCheck: boolean, scoreKey: any, score: number, tasksDone: number): void {
    const checkVal = !isCheck;
    let completedTasks = tasksDone;
    let addScore = score;
    if (addScore >= 100) {
      addScore = 0;
    } else if (checkVal && !compareCheck) {
      completedTasks += 1;
      addScore = score + 2;
    } else if (checkVal){
      completedTasks += 1;
    }
    else if (!checkVal){
      completedTasks -= 1;
    }
    this.taskRef.update(key, {check: checkVal, compareCheck: true}).then();
    this.scoreRef.update(scoreKey, {scoreVal: addScore, tasksDone: completedTasks}).then();
    this.backTransform = false;
    this.styleObject(index);
  }

  ngOnInit(): void {
    this.renderCounter();
    this.checkDate();
    this.checkEmptyTaks();
  }
  checkEmptyTaks(): void{
    this.taskVal.forEach(values => {
      if (values[0] === undefined) {
        this.availableTask = false;
        this.displayTry = true;
        this.eraseFAB = false;
      } else {
        this.availableTask = true;
        this.displayTry = false;
        this.eraseFAB = true;
      }
    }).then();
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

  closeReminder(): void {
    this.displayTry = false;
  }

  checkDate(): void {
    const lateWeekDate = new Date();
    lateWeekDate.setDate(lateWeekDate.getDate() - 7);
    this.score.forEach(lastModifiedDate => {
      this.getDate(lateWeekDate, new Date(lastModifiedDate[0].lastModifiedDate));
    }).then() ;
  }

  getDate(lateWeekDate: Date, lastModDate: Date): void {
    if (lateWeekDate > lastModDate) {
      this.zeroScore();
    }
  }
  zeroScore(): void{
    this.scoreRef.update(this.scoreKey, {
      lastModifiedDate: this.todayString,
      scoreVal: this.zeroVal,
      tasksDone: this.zeroVal,
      totalTasks: this.zeroVal
    }).then();
  }
  panleft(currentIndex: number): void {
    this.leftIndex = currentIndex;
    this.backTransform = true;
  }

  panright(currentIndex: number): void {
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
  delete(index: any, key: any, isCheck: boolean, compareCheck: boolean, scoreKey: any, score: number): void {
    let decScore = score;
    if (decScore < 100 && decScore >= 0) {
      if (isCheck) {
        decScore = score;
      } else if (!compareCheck) {
        if (decScore > 3 ){
          decScore = score - 3;
        } else {
          decScore = 0;
        }
      }
    } else {
      decScore = 0;
    }
    this.taskRef.remove(key).then();
    this.updateDate();
    this.scoreRef.update(this.scoreKey, {scoreVal: decScore}).then();
    this.backTransform = false;
  }

  updateDate(): void {
    this.scoreRef.update(this.scoreKey, {lastModifiedDate: this.todayString}).then();
  }
}

