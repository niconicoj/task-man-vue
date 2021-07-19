import {ITask} from '@/lib/Task';
import {MutationTree} from 'vuex';
import {MutationTypes} from './mutation-types';
import {State} from './state';

export type Mutations<S = State> = {
  [MutationTypes.ADD_TASKS](state: S, payload: ITask[]): void;
  [MutationTypes.ADD_TASK](state: S, payload: ITask): void;
  [MutationTypes.DELETE_TASK](state: S, payload: string): void;
  [MutationTypes.TOGGLE_REMINDER](state: S, payload: string): void;
  [MutationTypes.TOGGLE_ADD_TASK](state: S): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_TASKS](state, payload: ITask[]) {
    state.tasks = [
      ...state.tasks,
      ...payload,
    ];
  },
  [MutationTypes.ADD_TASK](state, payload: ITask) {
    state.tasks = [
      ...state.tasks,
      payload,
    ];
  },
  [MutationTypes.DELETE_TASK](state, payload: string) {
    state.tasks = state.tasks.filter((task) => task.id !== payload);
  },
  [MutationTypes.TOGGLE_REMINDER](state, payload: string) {
    state.tasks = state.tasks.map((task) =>
      task.id === payload ? {...task, reminder: !task.reminder} : task
    );
  },
  [MutationTypes.TOGGLE_ADD_TASK](state) {
    state.showAddTask = !state.showAddTask;
  },
}
