import { useTaskStore } from "../store/store";

function ScheduledTask() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div>
      <h2>Scheduled Tasks</h2>
      <ul>
        {tasks
          .filter((task) => task.status === "scheduled")
          .map((task) => (
            <li key={task.id}>
              {task.name} - {task.schedule}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ScheduledTask;
