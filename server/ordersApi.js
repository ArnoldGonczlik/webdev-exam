import express from "express";

export function OrdersApi(db) {
    const api = express.Router();

    api.post("/placeorder", async(req, res) => {
        const {username, items} = req.body;

        //create order object
        const order = {}
        order.username = username;
        order.items = items;
        order.placedDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');


        //first get current maxint of collection to then add item with one higher id
        try {
            const maxIntObject = await db.collection("Orders").find().sort({id:-1}).limit(1).map(({id}) => ({id})).toArray();
            let maxInt = 0;
            if (maxIntObject.length > 0) {
                maxInt = maxIntObject[0].id;
            }
            order.id = maxInt + 1
            const result = await db.collection("Orders").insertOne(order);
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });

    api.get("/getorders", async(req, res) => {
        try {
            const result = await db.collection("Orders").find({}).toArray();
            res.json(result);
        } catch (e) {
            console.log(e)
        }
    });
    return api;
}