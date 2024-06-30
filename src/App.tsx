import { QueryClientProvider } from "react-query";
import { queryClient } from "./service/queryClient";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ExecutedTask from "./components/ExecutedTask";
import { Container, Grid } from "@mui/material";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <TaskForm />
          </Grid>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={12}>
            <Grid xs={8} sx={{ margin: "auto" }}>
              <ExecutedTask />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
