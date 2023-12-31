import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("close", () => console.log("disconnected from the browser"))
    socket.on("message", (message) => {
        const parsedData = JSON.parse(message);
        switch(parsedData.type) {
            case "message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${parsedData.data}`) )
            case "nickname":
                socket["nickname"] = parsedData.data;
        }
    })
})
server.listen(3000, handleListen)
