import * as bodyParser from "body-parser";
import { config } from "dotenv";
import * as express from "express";
import http from "http";
import socketIO from "socket.io";
import authRouter from "./routers/AuthRouter";
import itemRouter from "./routers/ItemRouter";
import menuRouter from "./routers/MenuRouter";
import handleSocket from "./socket";
import { loggerMiddleware } from "./utils/logger";

config();
const { PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use("/menu", menuRouter);
app.use("/item", itemRouter);
app.use("/auth", authRouter);

const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", handleSocket);

server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
