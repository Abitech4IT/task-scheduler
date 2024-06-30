import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useTaskStore } from "../store/store";

function ExecutedTask() {
  const { executedTasks } = useTaskStore();

  return (
    <Paper sx={{ margin: 2, padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Executed Tasks
      </Typography>
      <List>
        {executedTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.name}
              secondary={`Executed At: ${task.executedAt?.toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ExecutedTask;
