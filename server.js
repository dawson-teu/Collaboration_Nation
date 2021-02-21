// This whole backend is using clearly terrible security, but I'm running out of time and energy

const express = require('express');
const path = require('path');
const fs = require('fs');
const { redirect } = require('statuses');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/sign-in', (req, res) => {
    const { email, password } = req.body;
    let database = JSON.parse(fs.readFileSync('database.json'));
    let found = false;
    for (let user of database) {
        if (user.information.email == email && user.password == password) {
            found = true;
            break;
        }
    }
    if (found) {
        res.sendFile(path.join(__dirname, 'public/coming-soon.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public/login.html'));
    }
});

app.post('/create-account', (req, res) => {
    const { email, password } = req.body;
    const user = { password };
    user.interests = null;
    user.information = { birthday: null, name: null, email: email, location: null };
    user.organizations = null;
    user.collaborators = null;
    let database = JSON.parse(fs.readFileSync('database.json'));
    database.push(user);
    fs.writeFileSync('database.json', JSON.stringify(database));
    res.sendFile(path.join(__dirname, 'public/coming-soon.html'));
});

app.listen(3000, () => {
    console.log('Listening at port 3000');
});
