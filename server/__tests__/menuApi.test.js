import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { MenuApi } from "../menuApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });


const app = express();
app.use(bodyParser.json());
let mongoClient;

beforeAll(async () => {
    mongoClient = new MongoClient(process.env.DB_CONNECTION);
    await mongoClient.connect();
    const database = mongoClient.db("unit_tests");
    await database.collection("Products").deleteMany({});
    await database.collection("Users").deleteMany({});
    app.use("/api/menu", MenuApi(database));
});

afterAll(() => {
    mongoClient.close();
});

describe("Menu api tests", () => {
    it("Get all movies", async () => {
        const agent = request.agent(app);
        const response = await agent
            .get("/api/menu/allitems");

        expect(response.status).toEqual(200);
    });

    it("Add one item", async () => {
        const agent = request.agent(app);
        const response = await agent
            .post("/api/menu/additem")
            .send({year: 2022, country: "Norway" });

        expect(response.status).toEqual(200);
    });
});