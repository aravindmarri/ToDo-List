import { Injectable } from '@angular/core';
import {TaskData} from 'src/app/task-data';
import { NewTask } from './values.model';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  constructor() { }
  getNewTask(): TaskData[] {
    return NewTask;
  }
}
