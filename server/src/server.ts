import express from "express";
import http from 'http';
import { Server as SocketIOServer } from "socket.io";


export class Server {
    private httpServer! : http.Server;
    private app! : express.Application;
    private io! : SocketIOServer;

    private readonly DEFAULT_PORT = 6900;

    constructor(){
        this.initialize();
        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize() : void {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);
    }
    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
          console.log("Socket connected.");
        });
      }

      private handleRoutes(): void {
        this.app.get("/", (req, res) => {
          res.send(`<h1>Hello World</h1>`); 
        });
      }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
          callback(this.DEFAULT_PORT)
        );
      }
}