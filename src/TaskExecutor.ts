import { useTaskStore } from "./store/store";

const executeTask = (taskId: string | number) => {
  const { tasks, updateTask } = useTaskStore.getState();
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    updateTask(taskId, { status: "executed", executedAt: new Date() });
  }
};

const taskScheduler = () => {
  const { tasks } = useTaskStore.getState();

  tasks.forEach((task) => {
    if (task.status === "scheduled") {
      const now = new Date();
      const taskTime = new Date(task.schedule); // Assuming schedule is a date string for simplicity

      if (now >= taskTime && now <= new Date(taskTime.getTime() + 10000)) {
        // within 10 seconds
        executeTask(task.id);
      }
    }
  });
};

setInterval(taskScheduler, 10000); // Check every 10 seconds
