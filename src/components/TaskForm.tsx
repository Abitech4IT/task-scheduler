import { useState } from "react";
import { isValidCron as validCron } from "cron-validator";
import { useTaskStore } from "../store/store";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function TaskForm() {
  const { addTask } = useTaskStore();
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [type, setType] = useState<"one-time" | "recurring">("one-time");

  function handleSubmit() {
    if (type === "recurring" && !validCron(schedule, { seconds: true })) {
      alert("Invalid cron expression");
      return;
    }

    addTask({
      id: Date.now(),
      name,
      schedule,
      type,
      status: "scheduled",
    });
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: Date.now(), name, schedule, type, status: "scheduled" },
      ])
    );

    setName("");
    setSchedule("");
  }

  return (
    <Paper sx={{ margin: 2, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Scheduler
      </Typography>
      <Box>
        <TextField
          label="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          fullWidth
          helperText="For recurring tasks, use cron syntax"
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "one-time" | "recurring")
            }
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="one-time">One-Time</MenuItem>
            <MenuItem value="recurring">Recurring</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
}

export default TaskForm;
