// Shared type definitions used across the app.

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Params for each screen in the stack navigator.
// TaskForm optionally receives a `task` — present = Edit mode, absent = Add mode.
export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { task?: Task } | undefined;
};
