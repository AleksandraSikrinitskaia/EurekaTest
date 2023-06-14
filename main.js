const netUsers = require('./src/process');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));

app.route('/').get((request, response) => {
    response.render('index', {
        title: 'Проверка пользователя'
    });
});

app.route('/users').post((request, response) => {
    const name = request.body.name;

    netUsers((userName) => {
        response.render('users', {title: `Пользователь ${name}`, value: userName.indexOf(name), name: name});
    });
});

const server = app.listen(process.argv[2], () => {
    console.log(`Приложение запущено на http://localhost:${server.address().port}`);
});