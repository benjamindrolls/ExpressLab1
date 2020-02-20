const express = require('express');
const cart = require('./data');

const app = express();
const port = 3000;

const shoppingCart = cart;

app.use(express.json());

app.listen(port, () => {
    console.log(`listing on http://localhost:${port}`)
})

app.get('/data/:ID', (req, res) => {
    const ID = parseInt(req.params.ID, 10);

    shoppingCart.map((shoppingCart) => {

        if (shoppingCart.ID === ID) {
            res.status(200);
            res.json(shoppingCart);

        }
    })

    return res.status(404).send("ID not found")
})
app.get('/data', (req, res) => {
    res.json(shoppingCart)
})

app.post('/data', (req, res) => {
    const body = req.body.data;
    const ID = new Date().getTime();

    const newItem = {
        ID: ID,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    }

    shoppingCart.push(newItem);
    res.status(201).send("added to cart");
    res.json("Fact successfully added");
})

app.put('/data/:ID', (req, res) => {
    const ID = parseInt(req.params.ID, 10);
    const newFact = req.body;

    res.status(200).send("ok")
    shoppingCart.splice(ID, 1, newFact)
    res.json("updating random fact");
})

app.delete('/data/:ID', (req, res) => {
    const ID = parseInt(req.params.ID, 10);

    shoppingCart.map((cartItem, index) => {

        if (cartItem.ID === ID) {
            shoppingCart.splice(index, 1)
            res.status(204).send("no content")
            res.json("deleting random fact");

        }
    })

})

