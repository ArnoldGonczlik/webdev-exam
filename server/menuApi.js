import express from "express";

export function MenuApi(db) {
    const api = express.Router();

    api.get("/allitems", async(req, res) => {
        const result = await db.collection("Products").find({}).toArray();
        res.json(result);
    });

    api.post("/namecontains", async(req, res) => {
        const {name} = req.body;
        const query = {};

        //Adds regex to make search case-insensitive
        query.name = {"$regex": (name.toLowerCase()), "$options": 'i'};

        const result = await db.collection("Products").find(query).map(({_id, name, description, price}) => ({_id, name, description, price})).toArray();
        res.json(result);
    });

    api.post("/additem", async(req, res) => {
        const {name, description, price} = req.body;

        const itemList = []
        const itemjson = await db.collection("Products").find({"name": name}).map(({name}) => ({name})).toArray()

        itemjson.map((item) => {
            itemList.push(item.name)
        })

        if(itemList.includes(name)) {
            res.sendStatus(406)
            return;
        }

        db.collection("Products").insertOne({"name": name, "description": description, "price": price});

        res.sendStatus(200);
    });

    api.post("/deleteitem", async(req, res) => {
        const {name} = req.body;

        const query = {};
        query.name = {"$regex": (name.toLowerCase()), "$options": '^i$'}

        const result = await db.collection("Products").deleteOne({"name": query.name});

        res.json(result);
        console.log(result)
    });

    return api;
}