const express = require("express");
const expressws = require("express-ws");
const cors = require("cors");
const path = require("path");
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const app = express();
httpServer.listen(9000);

app.use(express.static("public"));

const expressWs = expressws(app);

app.use(express.json());
app.use(cors({origin : "*"}));
app.options("*", cors());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/index"));
});

app.get("/station/goa", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/station_goa.html"));
});

app.get("/station/patna", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/station_patna.html"));
});

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
    try {
    io.emit("goa", JSON.parse(msg));
    }

    catch(e){
      console.log(e);
    }
    
  });
  console.log("socket", req.testing);
});

app.ws("/patna", function (ws, req) {
  ws.on("message", function (msg) {
    console.log("Patna");
    console.log(msg);
    try {
    io.emit("patna", JSON.parse(msg));
    }
    catch(e){
      console.log(e);
    }
  });
    console.log("socket", req.testing);
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
