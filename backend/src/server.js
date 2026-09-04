import express from "express";

import mainRouter from "./routes/index.js";
import v1Router from "./routes/v1/index.js";

const app = express();

app.use(express.json());
app.use("/", mainRouter);
app.use("/api/v1", v1Router);

// Centralize error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Something went wrong on the server",
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running at http://localhost:${port}`);
});