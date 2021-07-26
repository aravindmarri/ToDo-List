import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TaskData } from './task-data';


@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  private dbPath = '/Tasks';

  // taskRef: AngularFireList<TaskData> = null;
  taskRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.taskRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<TaskData> {
    return this.taskRef;
  }

  create(tutorial: TaskData): any {
    return this.taskRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.taskRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.taskRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.taskRef.remove();
  }
}
