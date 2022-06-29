import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import WebSocket from 'ws';
import { Message, User } from './models';
import { messageRouter, userRouter } from './routes';
import { DB } from './services';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/messages', messageRouter);

try {
  DB.connect();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log((error as Error).message);
}

const webSocketServer = new WebSocket.Server({ port: 9000 });

webSocketServer.on('connection', (ws) => {
  ws.on('message', async (payload) => {
    const event = JSON.parse(payload.toString());

    if (!event || !event.userId || !event.message) {
      return;
    }

    const user = await User.findById(event.userId);

    if (!user) {
      return;
    }

    const message = new Message({ userName: user.name, value: event.message });

    await message.save();

    webSocketServer.clients.forEach((client) => client.send(JSON.stringify(message)));
  });

  ws.on('error', (e) => ws.send(e));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
