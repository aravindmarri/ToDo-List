import {Component, Injectable, OnInit} from '@angular/core';
import {Values} from '../values.model';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {query, style, transition, trigger, stagger, animate} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AddtaskComponent} from './addtask/addtask.component';

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
  flagValue = false;
  color = '#aa4465';
  flagName = 'star_border';

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.itemsRef = db.list('Tasks');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  addItem(taskName: string, taskCheck: boolean, taskFalg: boolean): void {
    this.itemsRef.push({name: taskName, check: taskCheck, flag: taskFalg});
  }

  submit(): void {
    this.dialog.open(AddtaskComponent, {
      data: { name: this.name, description: this.description}
    }).afterClosed().subscribe((response) => {
      console.log(response);
    });
    // const dialogRef = this.dialog.open(AddtaskComponent, {
    //   width: '300px',
    //   data: {name: this.name, description: this.description}
    // });
    // dialogRef.afterClosed().subscribe((res) => {
    //   console.log(res);
    //   // this.name = result;
    //   // this.description = result;
    // });
    console.log(this.name, this.check, this.flagValue);
    // this.addItem(this.name, this.check, this.flagValue);
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
  }
}
