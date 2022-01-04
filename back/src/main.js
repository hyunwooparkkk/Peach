// .env 파일에서 환경변수 불러옴
require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import http from "http";
import socket from "socket.io";
import mongoose from "mongoose";
import api from "./routes/index";
import Chatting from "./models/chat";
import first from "./routes/first";
import work from "./routes/work";
import serve from "koa-static-server";
import cookie from "koa-cookie";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { PORT, MONGO_URI, NODE_ENV } = process.env;

const connect = () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
};

mongoose
  .connect(MONGO_URI, {
    dbName: "myFirstDatabase",
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("몽고디비를 연결해볼가..."))
  .catch((error) => console.error(error));

const port = PORT || 5000;
const app = new Koa();
const router = new Router();

app.use(cookie());

const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "*",
  },
});


router.use("/api", api.routes());
router.use("/first", first.routes());
router.use("/work", work.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(serve({ rootDir: "src/uploads", rootPath: "/uploads" }));

server.listen(port, () => {
  console.log(`서버 시작... ${port}번 포트`);
});


io.on("connection", async (socket) => {
    const { room } = socket.handshake.query;
    socket.join(room);

    console.log(`소켓 연결 ${socket.id}`);
    console.log(`입장 ${room}으로 입장`);

    socket.on("send code", (data2) => {
        console.log("***********" + data2.select, data2.code);
        if (data2.select == undefined) {
        io.sockets.emit(data2.code, data2.mycode);
        } else {
        io.sockets.emit(data2.code, data2.select);
        }
    });

    const chatLists = await Chatting.find({ room: room }).sort("messageDate");
    console.log("=======================================");

    socket.emit("chatLists", chatLists);

    // 실시간 입력
    socket.on("typing", () => {
        socket.broadcast.emit("typing", socket.id);
    });
    socket.on("typingDone", () => {
        socket.broadcast.emit("typingDone");
    });

    // text message
    socket.on("newText", (data) => {
        io.in(room).emit("newMessage", data);
        console.log(`텍스트 데이터 ==> ${data.senderId} : ${data.textMessage}`);

        const chatting = new Chatting({
        room: room,
        user: data.senderId,
        message: data.textMessage,
        });
        chatting.save();
    });

    // image message
    socket.on("newImage", (data) => {
        io.in(room).emit("newMessage", data);

        const chatting = new Chatting({
        room: room,
        user: data.senderId,
        messageImg: data.imageMessage,
        });
        chatting.save();
    });

  socket.on("disconnect", () => {
    socket.leave(room);
    console.log("소켓 연결 해제");
  });
});
