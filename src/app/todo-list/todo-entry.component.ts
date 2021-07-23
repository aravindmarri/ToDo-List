import {Component, Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from './addtask/addtask.component';
import {trigger, state, style, animate, transition, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({opacity: 0}))
          ])
        ]),
        query(':enter', [
          style({opacity: 0}),
          stagger(100, [
            animate('0.5s', style({opacity: 1}))
          ])
        ])
      ])
    ])

  ]
})

@Injectable()
export class TodoEntryComponent implements OnInit {
  taskRef: AngularFireList<any>;
  items: Observable<any[]>;
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

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.taskRef = db.list('Tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.taskRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskDescription: string, todayString: string): void {
    this.taskRef.push({name: taskName, description: taskDescription, check: false, date: todayString});
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

  checkChange(key: string, isCheck: boolean): void {
    setTimeout(() => {
      this.taskRef.update(key, {check: !isCheck});
    }, 100);
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

  panleft(currentIndex: number, evt: any): void {
    this.leftIndex = currentIndex;
    this.backTransform = true;
  }

  panright(currentIndex: number, evt: any): void {
    this.rightIndex = currentIndex + 1001 ;
    this.styleObject(currentIndex + 1001);
    this.backTransform = false;
  }

  styleObject(currentIndex: number): object | any {
    if (this.leftIndex === currentIndex  && this.backTransform) {

      return {transform: 'translate3d(-64px, 0px, 0px)'};
    }
    else{
      return {transform: 'translate3d(0px, 0px, 0px)'};
    }
  }
  delete(index: any, key: any): void{
    // Todo Add delete Functionality
    alert('delete');
}
}
