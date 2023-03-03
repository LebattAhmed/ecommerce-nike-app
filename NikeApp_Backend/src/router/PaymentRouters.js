const express = require("express");
const stripe = require("stripe")(
    'sk_test_51MhbeFBu9fDzE6LPJ6nt7MO2wgaHTqFT8dhzrZOv4fnJRtAO1gek9WgrJsOvhTeYIYuyaueSu0zSR7gu8IAKg1xP00vrN1tvq9'
);
const router = express.Router();


router.post('/intents', async(req, res) => {

    try {
        //create payment intents
        const paymentIntents = await stripe.paymentIntents.create({
            amount : req.body.amount, 
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        })
        //return payment intents 
        res.json({ paymentIntent: paymentIntents.client_secret });

    }catch(e){
        res.status(400).json({
            error: e.message,
          });
    }
    
})


module.exports = router;

