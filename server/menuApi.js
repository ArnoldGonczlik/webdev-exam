import express from "express";

export function MenuApi(db) {
    const api = express.Router();

    api.get("/allitems", async(req, res) => {
        try {
            const result = await db.collection("Products").find({}).toArray();
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    //did not make use of this endpoint but thought to leave it in
    api.post("/namecontains", async(req, res) => {
        const {name} = req.body;
        const query = {};

        //Adds regex to make search case-insensitive
        query.name = {"$regex": (name.toLowerCase()), "$options": 'i'};
        try {
            const result = await db.collection("Products").find(query).map(({_id, name, description, price}) => ({_id, name, description, price})).toArray();
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    api.post("/additem", async(req, res) => {
        const {name, description, price} = req.body;

        //first get current maxint of collection to then add item with one higher id
        try {
            const maxIntObject = await db.collection("Products").find().sort({id:-1}).limit(1).map(({id}) => ({id})).toArray();
            const maxInt = maxIntObject[0].id;
            const result = await db.collection("Products").insertOne({"id": maxInt + 1, "name": name, "description": description, "price": price});
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    api.delete("/deleteitem", async(req, res) => {
        const {id} = req.body;

        console.log(id)

        try {
            const result = await db.collection("Products").deleteOne({"id": parseInt(id)});
            console.log(result)
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    api.put("/edititem", async(req, res) => {
        const {id, name, description, price} = req.body;

        try {
            const result = await db.collection("Products").updateOne({"id": id}, {"$set": {"name": name, "description": description, "price": price}});
            res.json(result);
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    });

    return api;
}