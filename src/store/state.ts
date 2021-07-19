import {ITask} from "@/lib/Task"

export type State = {
  tasks: ITask[];
  showAddTask: boolean;
}

export const initialState: State = {
  tasks: [],
  showAddTask: false
}
