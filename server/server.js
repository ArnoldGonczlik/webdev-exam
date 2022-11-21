import express from "express";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const app = express();

app.use(express.static("../client/dist"));

const testData = [
    {
        id: 1,
        name: "Dish1",
        price: 1337,
        description: "A fantastic dish"
    },
    {
        id: 2,
        name: "Dish2",
        price: 1338,
        description: "An ok dish"
    },
    {
        id: 3,
        name: "Dish3",
        price: 1339,
        description: "A not so good dish"
    }
]

app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        return res.sendFile(path.resolve("../client/dist/index.html"));
    }  else {
        next();
    }
});

app.get("/api/test", (req, res) => {
    res.json({"test": "data", "because": "its cool"})
});

app.get("/api/dishes", (req, res) => {
    res.json(testData)
});

const server = app.listen(process.env.PORT,
    () => {console.log(`Server started on: http://localhost:${server.address().port}`)});