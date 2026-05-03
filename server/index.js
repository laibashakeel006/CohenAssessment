const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "config.env" });

// let todos = [{id: 1, name: 'Cohen Interview Assignment'}];

const PORT = process.env.PORT || 3000

// app.get('/todos', (req, res) => {
//   return res.status(200).send(todos);
// });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use("/todos", require("./src/routes/todo.routes.js"));
app.use("/tasks", require("./src/routes/task.routes.js"));

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
