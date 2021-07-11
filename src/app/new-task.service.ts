import { Injectable } from '@angular/core';
import { Task } from './task';
import { NewTask } from './values.model';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  constructor() { }
  getNewTask(): Task[] {
    return NewTask;
  }
}
