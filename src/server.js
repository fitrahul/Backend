const express = require('express');
const connect = require("./configs/db");
const cors = require('cors');
const userController = require("./controllers/user.controller");

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:4567', credentials: true}));
app.use("/user", userController);

app.listen(4567, async () => {
    await connect();
    console.log("Listening on port 4567");
})