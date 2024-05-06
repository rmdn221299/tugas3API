import { expect as _expect } from 'chai';
import request from 'supertest';
const config = require("../../../data/config.json");
const userData = require ("../../../data/user/get.user.data.json");

async function getToken() {
    const response = await request(config.baseUrl) // baseUrl
    .post("/authentications") // endpoint
    .send(userData.success)
    const token = await response.body.data.accessToken
    console.log((await token).body)

    return token
}

module.exports = { getToken }

