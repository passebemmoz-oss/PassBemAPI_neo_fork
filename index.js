const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const bodyParser =require("body-parser");

const routes = require("./routes");
const {setupWebsocket} = require("./websocket");

const {acess} = require("./src/database/Mongo")

const MangerCron = require('./src/cron/index');

const app = express();

mongoose.connect(acess, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Use createIndex instead of ensureIndex
    retryWrites: true
})

const server = http.Server(app);

setupWebsocket(server);

app.use(express.json({
    limit: '100mb'
}));

app.use(cors());

app.use(express.json());

app.use("/files", express.static(path.resolve(__dirname,"uploads")))
app.use(routes);

server.listen(process.env.PORT || 3333 , () => {
    MangerCron.run()
});


