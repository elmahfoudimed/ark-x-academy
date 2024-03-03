// Importing
const express = require('express');
const bodyParser = require('body-parser');
const NotFoundError = require('http-errors').NotFoundError;

// A dummy array of products
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

const app = express();
const port = 5000;

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/search', (req, res) => {
    let { minPrice, maxPrice } = req.query;

    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    let filteredProducts = products.filter(product => {
        if (minPrice && maxPrice) return product.price >= minPrice && product.price >= maxPrice;
        else if (minPrice) return product.price >= minPrice;
        else if (maxPrice) return product.price <= maxPrice;
    })

    if (filteredProducts.length) res.send(filteredProducts);
    else res.send('Not found!');
});

app.get('/products/:id', (req, res) => {
    let id = req.params.id;

    if (id > 0 && id <= products.length) {
        res.send(products.find(product => product.id == id));
    } else {
        res.send('Not found!');
    }
});

app.post('/products', (req, res) => {
    let { name, price } = req.body;

    let newProduct = {
        id: products[products.length - 1].id + 1,
        name: name,
        price: price
    };

    products.push(newProduct);
    res.send('Product created successfully!');
});

app.put('/products/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;
    let helper = 1;

    for (let i in products) {
        if (products[i].id == id) {
            products[i] = { id: Number(id), name: data.name, price: data.price };
            res.send('Product updated successfully!');
            helper = 0;
            break;
        }
    }

    if (helper) res.send('Not found!');
});

app.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    let helper = 1;

    for (let i in products) {
        if (products[i].id == id) {
            products.splice(i, 1);
            res.send('Product deleted successfully!');
            helper = 0;
            break;
        }
    }

    if (helper) res.send('Not found!');
});

// app.use("*", (req, res, next) => {
//     res.send("The requested route does not exist.");
// });

app.use("*", (req, res, next) => {
    next(new Error("The requested route does not exist."));
});

// Error handling middleware
app.use((err, req, res, next) => {
    // Handle the error
    res.send(err.message);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});