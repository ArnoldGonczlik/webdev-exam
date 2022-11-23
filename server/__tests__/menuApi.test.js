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
            .send({name: "Kebab", description: "Best food", price: 100});

        expect(response.status).toEqual(200);
    });

    it("Add item, then search for it", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/menu/additem")
            .send({name: "Kebab", description: "Best food", price: 100});

        const response = await agent
            .post("/api/menu/namecontains")
            .send({name: "bab"});

        expect(response.body[0].name).toEqual("Kebab");
    });

    it("Add item, then delete", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/menu/additem")
            .send({name: "Kebab", description: "Best food", price: 100});

        const response = await agent
            .delete("/api/menu/deleteitem")
            .send({id: 1});

        expect(response.body.deletedCount).toEqual(1);
    });

    it("Add item, then edit", async () => {
        //I have to make sure all items are deleted from db, as when i run all tests i think they run too quick, so
        //things are not properly deleted
        await mongoClient.connect();
        const database = mongoClient.db("unit_tests");
        await database.collection("Products").deleteMany({});
        const agent = request.agent(app);
        await agent
            .post("/api/menu/additem")
            .send({name: "Kebab", description: "Best food", price: 100});

        const response = await agent
            .put("/api/menu/edititem")
            .send({id: 1, name: "Keb", description: "ab", price: 99});

        expect(response.body.modifiedCount).toEqual(1);
    });
});