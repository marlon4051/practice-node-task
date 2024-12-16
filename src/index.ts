import express from 'express';
import { Task } from './models/task';

const app = express();
app.use(express.json())

let tasks: Task[] = [
  {
      id: 1,
      title: "task 1",
      completed: true
  },
  {
      id: 2,
      title: "task 2",
      completed: false
  },
  {
      id: 3,
      title: "task 3",
      completed: true
  }
]

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});
// Get all the tasks
app.get('/tasks', (req, res) => {
  res.send(tasks);
});

// Create new tasks
app.post('/tasks', (req, res) => {
  let newTask: Task = req.body;
  if (isNaN(req.body.id)) {
    res.send("Invalid task, id needs to be a number");
  } 
  const idUnique = tasks.find(task=> task.id === newTask.id);
  console.log(idUnique)
  if(idUnique !== undefined) {
    res.send("Invalid task, id needs to be unique");
  }
  
  tasks.push(newTask);
  res.send(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskIndexToUpdate = tasks.findIndex(task => task.id === Number(req.params.id));
  if(taskIndexToUpdate === -1) {
    res.send("Task to update not found");
  }
  if (isNaN(req.body.id)) {
    res.send("Invalid task, id needs to be a number");
  } 
  let newTask: Task = req.body;
  tasks[taskIndexToUpdate] = newTask;
  res.send(tasks);
});

// Delete
app.delete('/tasks/:id', (req, res) => {
  const taskIndexToRemove = tasks.findIndex(task => task.id === Number(req.params.id));
  if(taskIndexToRemove === -1) {
    res.send("Task to delete not found");
  }
  tasks =tasks.filter(task => task.id !== Number(req.params.id))
  res.send(tasks);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
