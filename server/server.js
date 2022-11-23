import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {UsersApi} from "./usersApi.js";
import {MenuApi} from "./menuApi.js";
import {OrdersApi} from "./ordersApi.js";
import {MongoClient} from "mongodb";
dotenv.config({ path: '../.env' });

const app = express();

app.use(bodyParser.json());

const mongodburl = process.env.DB_CONNECTION;

if(mongodburl){
    const client = new MongoClient(mongodburl);

    client
        .connect()
        .then((conn) => app.use("/api/users",
            UsersApi(conn.db(process.env.DB_NAME || "TheFantasticCaterers"))));

    client
        .connect()
        .then((conn) => app.use("/api/menu",
            MenuApi(conn.db(process.env.DB_NAME || "TheFantasticCaterers"))));

    client
        .connect()
        .then((conn) => app.use("/api/orders",
            OrdersApi(conn.db(process.env.DB_NAME || "TheFantasticCaterers"))));
}

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        return res.sendFile(path.resolve("../client/dist/index.html"));
    }  else {
        next();
    }
});

const server = app.listen(process.env.PORT,
    () => {console.log(`Server started on: http://localhost:${server.address().port}`)});