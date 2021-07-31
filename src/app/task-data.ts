export interface TaskData {
  key: string;
  check: boolean;
  compareCheck: boolean;
  date: string;
  description: string;
  name: string;
}
export interface Score {
  key: string;
  lastModifiedDate: Date;
  scoreVal: number;
  tasksDone: number;
  totalTasks: number;
}
