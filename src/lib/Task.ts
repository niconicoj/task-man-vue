export interface ITask {
  id: string;
  text: string;
  day: string;
  reminder: boolean;
}

export interface ITasksResponse {
  data?: ITask[];
  errors?: Array<{message: string}>;
}
