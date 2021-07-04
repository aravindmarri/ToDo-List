
import {Component, Injectable, Input, OnInit, Output} from '@angular/core';
import {Values} from '../values.model';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})

@Injectable()
export class TodoEntryComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  todoForm: any;
  url = 'https://todo-app-0355-default-rtdb.firebaseio.com/todo';
  message = 'Hi';
  name = '';
  check = false;
  flagValue = false;
  color = '#aa4465';
  flagName = 'star_border';
  temp = 'hi';
  todoList = [
    new Values(
      'Tasty Schnitzel',
      false,
      false
    ),
    new Values(
      'Big Fat Burger',
      false,
      false
    )
  ];
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('Tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addItem(taskName: string, taskCheck: boolean, taskFalg: boolean): void {
    this.itemsRef.push({ name: taskName , check: taskCheck , flag: taskFalg});
  }
  submit(): void {
    this.todoList.push({name: this.name, check: false, flag: this.flagValue});
    console.log(this.name,  this.check , this.flagValue);
    this.addItem(this.name, this.check, this.flagValue);
  }
  checkChange(key: string, isCheck: boolean): void{
    this.itemsRef.update(key, { check : !isCheck });
  }
  flagChange(key: string, isCheck: boolean): void{
    setTimeout(() => {
      this.itemsRef.update(key, { flag : !isCheck });
    }, 100);
  }
  ngOnInit(): void {
  }
}
