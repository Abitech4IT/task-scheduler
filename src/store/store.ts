import create from "zustand";

interface Task {
  id: string | number;
  name: string;
  schedule: string;
  type: "one-time" | "recurring";
  status: "scheduled" | "executed";
  executedAt?: Date;
}

interface TaskState {
  tasks: Task[];
  executedTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string | number, task: Partial<Task>) => void;
  deleteTask: (id: string | number) => void;
  executeTask: (id: string | number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  executedTasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  executeTask: (id) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.executedAt = new Date();
        return {
          tasks: state.tasks.filter((t) => t.id !== id),
          executedTasks: [...state.executedTasks, task],
        };
      }
      return state;
    }),
}));
