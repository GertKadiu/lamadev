import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import testRouter from "./routes/test.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:'http://localhost:5173', credentials: true }));

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use('/api/test', testRouter);
app.use("/api/users", userRouter);
app.use('/api/posts', postRouter);

console.log("test2");

app.listen(8800, () => {
  console.log("Server is runing");
});
