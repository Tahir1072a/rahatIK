const express = require('express');
const { getToken, getData } = require('./fetchData');
const { saveData, Hesap } = require('./db');
const cron = require('node-cron');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const hesaplar = await Hesap.find({});
    res.render('index', { hesaplar });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Her saat başı veri çek ve kaydet
cron.schedule('0 * * * *', async () => {
    const token = await getToken();
    const data = await getData(token);
    await saveData(data);
});