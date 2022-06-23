const express = require("express");
const { createServer } = require("http");
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json())

const PORT = process.env.PORT

app.get("/image", (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`))
        const data = "data:image/png;base64," + file.toString("base64")
        return res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Ошибка"})
    }
})

app.post("/image", (req, res) => {
    try {
        const data = req.body.img.replace("data:image/png;base64,", "")
        fs.writeFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`), data, "base64")
        return res.json({message: "Сохранено"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Ошибка"})
    }
})

const httpServer = createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
});

io.on("connection", (socket) => {
  console.log("connected")
  socket.on("enter", data => {
    console.log("asas")
    socket.join(data.id)
  })

  socket.on("draw", data => {
    socket.to(data.id).emit("update_canvas", data)
    socket.emit("update_canvas", data)
  })
});

httpServer.listen(PORT, () => {console.log("SERVER STARTED")});