const express = require("express");
const  router = express.Router();
const {createOrder, getOrder} = require('../database/oreders')


router.post('/', async (req, res) => {
    const orderData = req.body;
    orderData.ref = (Math.random() + 1).toString(36).substring(7);
    const newOrder = await createOrder(orderData);
    res.send({
        status: 'OK',
        data: newOrder,
    })
})


router.get('/:reference', async (req, res) => {
    try {
    const order = await getOrder(req.params.reference);
    
    if (!order) {
        res.status(404).send({
                status: 'FAILED', error: 'order not found'
            })
        return;
    }

    res.send({
            status: 'OK',
            data: order,
        })
    } catch (e) {
        res.status(401).send({status: 'FAILED', error: e.message})
    }
})

module.exports = router;
