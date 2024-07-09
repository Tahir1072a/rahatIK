const axios = require('axios');

async function getToken() {
    const url = "https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/sessions";
    const response = await axios.post(url, {}, {
        auth: {
            username: 'apitest',
            password: 'test123'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data.response.token;
}

async function getData(token) {
    const url = "https://efatura.etrsoft.com/fmi/data/v1/databases/testdb/layouts/testdb/records/1";
    const response = await axios.patch(url, {
        fieldData: {},
        script: 'getData'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return JSON.parse(response.data.response.scriptResult);
}

module.exports = { getToken, getData };