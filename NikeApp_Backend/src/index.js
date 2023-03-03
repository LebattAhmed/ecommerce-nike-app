const express = require("express");
const ProductRoutes = require('./router/ProductRoutes');
const OrderRoutes = require('./router/OrderRoutes');
const PaymentRoutes = require('./router/PaymentRouters')
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use('/products', ProductRoutes)
app.use('/orders', OrderRoutes)
app.use('/payments', PaymentRoutes)

app.get('/', (req, res) =>{
    res.send("<h2>Hello world</h2>")
})

app.listen(PORT, () => {
    console.log('API is listening to port', PORT)
})