import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useTaskStore } from "../store/store";

function TaskList() {
  const { tasks, executeTask, deleteTask } = useTaskStore();

  return (
    <Paper sx={{ margin: 2, padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Scheduled Tasks List
      </Typography>
      {tasks.length > 0 ? (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.name}
                secondary={`Schedule: ${task.schedule} | Type: ${task.type}`}
              />
              <Button
                onClick={() => executeTask(task.id)}
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
              >
                Execute
              </Button>
              <Button
                onClick={() => deleteTask(task.id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No task schedule</Typography>
      )}
    </Paper>
  );
}

export default TaskList;
