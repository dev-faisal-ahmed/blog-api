import express from "express";
import cors from "cors";

import { PORT } from "./config.js";
import { blogRouter } from "./router/blog.router.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
