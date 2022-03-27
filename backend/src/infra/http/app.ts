import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "../shared/container";
import "dotenv/config";
import "express-async-errors";
import { routes } from "./routes";
import { IAppError } from "../../core/domain/errors/IAppError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
  (err: IAppError, request: Request, response: Response, next: NextFunction) => {
    return response.status(err.statusCode || 500).json({
      message: err.message
    });
  }
);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  }
});

io.on("connection", socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);
})

export { serverHttp, io }