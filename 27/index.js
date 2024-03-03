const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(`Error: ${error}`));

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await User.create({ name: name, email: email, age: age });
        console.log(newUser);
        res.send('User created successfully!');
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }

});

app.get('/users', async (req, res) => {
    try {
        const { name, email } = req.query;
        const q = name ? { name: name, email: email } : {};
        const users = await User.find(q);
        console.log(Date.parse(users[0].createdAt))
        res.send(users);
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
});

app.patch('/users/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const newEmail = req.body.email;
        const user = await User.findOneAndUpdate(
            { name: name },
            { $set: { email: newEmail } }
        );

        if (user) res.send(user);
        else res.send('User not found');
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
});

app.delete('/users/:days', async (req, res) => {
    try {
        const current = Date.now();
        const limit = current - (86400000 * Number(req.params.days));

        const count = await User.deleteMany({ createdAt: { $lt: limit } });

        res.send(`Total deleted users: ${count.deletedCount}`);

    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));