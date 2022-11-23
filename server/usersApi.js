import express from "express";

export function UsersApi(db) {
    const api = express.Router();

    api.post("/checkusername", async(req, res) => {
        const {username} = req.body;
        const query = {};

        if(username !== 'undefined') {
            query.username = username.toLowerCase();
        }
        try {
            const result = await db.collection("Users").find(query).map(({username}) => ({username})).toArray();
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    api.post("/getuser", async(req, res) => {
        const {username} = req.body;
        const query = {};

        if(username !== 'undefined') {
            query.username = username.toLowerCase();
        }

        try {
            const result = await db.collection("Users").find(query).map(({username, permissionGroup}) => ({username, permissionGroup})).toArray();
            res.json(result);
        } catch (e) {
            console.log(e)
        }

    });

    api.post("/createuser", async(req, res) => {
        const {username} = req.body;
        const query = {};

        if(username !== 'undefined') {
            query.username = username.toLowerCase();
        }

        try {
            db.collection("Users").insertOne({"username": query.username, "permissionGroup": 1});
            const result = await db.collection("Users").find(query).map(({username, permissionGroup}) => ({username, permissionGroup})).toArray();

            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    return api;
}