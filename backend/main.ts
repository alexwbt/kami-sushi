import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";
import authRouter from "./routers/AuthRouter";
import itemRouter from "./routers/ItemRouter";
import menuRouter from "./routers/MenuRouter";
import handleSocket from "./socket";
import { loggerMiddleware } from "./utils/logger";
import passport from "./utils/passport";

const { PORT, JWT_SECRET, CORS_ORIGIN } = process.env;

const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser(JWT_SECRET));
app.use(loggerMiddleware);
app.use("/menu", menuRouter);
app.use("/item", itemRouter);
app.use("/auth", authRouter);

const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", handleSocket);

passport();

server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
