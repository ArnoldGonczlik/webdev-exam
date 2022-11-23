import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { UsersApi } from "../usersApi.js";
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
    app.use("/api/users", UsersApi(database));
});

afterAll(() => {
    mongoClient.close();
});

describe("Users api tests", () => {
    it("Create user", async () => {
        const agent = request.agent(app);
        const response = await agent
            .post("/api/users/createuser")
            .send({username: "test-user"});

        expect(response.body[0].username).toEqual("test-user");
    });

    it("Create user, then check if username exists", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/users/createuser")
            .send({username: "test-user"});

        const response = await agent
            .post("/api/users/checkusername")
            .send({username: "test-user"});

        expect(response.body[0].username).toEqual("test-user");
    });

    it("Create user, then check permission group", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/users/createuser")
            .send({username: "test-user"});

        const response = await agent
            .post("/api/users/getuser")
            .send({username: "test-user"});

        expect(response.body[0].permissionGroup).toEqual(1);
    });

    it("Add item, then delete", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/menu/additem")
            .send({name: "Kebab", description: "Best food", price: 100});

        const response = await agent
            .delete("/api/menu/deleteitem")
            .send({id: 1});

        console.log(response)

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