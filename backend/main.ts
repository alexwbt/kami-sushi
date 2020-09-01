import { config } from 'dotenv';
import * as express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import handleSocket from './socket';

config();

const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', handleSocket);

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
