import {Component, Injectable, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Values} from './values.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent {
  title = 'todo-app';
  name = '';
  desc = '';
  youCanTAdd = false;
  taskDone = false;
  todoArray: Values[] = [];
  valuesChanged = new Subject<Values[]>();
  private values: Values[] = [
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
  // onSubmit(newThing: HTMLInputElement, newDisc: HTMLInputElement): void {
  //   if (this.todoArray.toString().toLowerCase().includes(newThing.value.toLowerCase())) {
  //     alert('Your next task is already added');
  //     this.youCanTAdd = !this.youCanTAdd;
  //   } else {
  //     // this.todoArray.push(newThing.value, newDisc.value, this.taskDone);
  //     this.todoArray.addToList();
  //     console.log(this.todoArray);
  //   }
  //   addToList(val: Values) {
  //     this.values.push(val);
  //     this.recipesChanged.next(this.todoArray.slice());
  //   }
  // }
  todoForm: any;

  onSubmit(): void {
  }
}
