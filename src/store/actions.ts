import {ActionContext, ActionTree} from 'vuex';
import {apiFetch} from '@/lib/api';
import {ITask} from '@/lib/Task'
import {State} from '@/store/state';
import {ActionTypes} from '@/store/action-types'
import {Mutations} from '@/store/mutations';
import {MutationTypes} from '@/store/mutation-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.ADD_TASK](
    {commit}: AugmentedActionContext,
    payload: {text: string, day: string, reminder: boolean}
  ): void
  [ActionTypes.DELETE_TASK](
    {commit}: AugmentedActionContext,
    payload: string
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.ADD_TASK]({commit}, payload: {text: string, day: string, reminder: boolean}) {
    const res = await apiFetch<ITask>("api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    commit(MutationTypes.ADD_TASK, res);
  },
  async [ActionTypes.DELETE_TASK]({commit}, payload: string) {
    await apiFetch<ITask>(`api/tasks/${payload}`, {
      method: "DELETE",
    });
    commit(MutationTypes.DELETE_TASK, payload);
  },
  async [ActionTypes.TOGGLE_REMINDER]({commit, state}, payload: string) {
    const task = state.tasks.find((task) => task.id === payload)!;
    await apiFetch<ITask>(`api/tasks/${payload}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        reminder: !task.reminder,
      }),
    });
    commit(MutationTypes.TOGGLE_REMINDER, payload);
  }
}
