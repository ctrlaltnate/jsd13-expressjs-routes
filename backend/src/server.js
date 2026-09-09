import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mainRouter from "./routes/index.js";
import v1Router from "./routes/v1/index.js";
import v2Router from "./routes/v2/index.js";
import {connectSupabase} from "./config/supabase.js"

const app = express();

async function startServer() {
  try {
    await connectSupabase();
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the process with an error code
  }
}

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);
// Centralize error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Something went wrong on the server",
  });
});

const port = 3001;

startServer();
