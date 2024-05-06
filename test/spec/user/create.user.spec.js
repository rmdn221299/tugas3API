import { expect as _expect } from 'chai';
const expect = _expect;
const { getToken } = require("../auth/token.auth.spec.js");
import request from 'supertest';
const config = require("../../../data/config.json");
const userData = require("../../../data/user/create.user.data.json");

async function createUser(payload,token) {
    const response = await request(config.baseUrl) // baseUrl
    .post("/users") // endpoint
    .send(payload)
    .set("Authorization", `Bearer ${token}`)

    return response
}

describe('Create User', () => {
    it('Success create a new user', async () => {
        const token = await getToken() // get token
        const payload = userData
        const response = await createUser(payload, token)

        // assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.data.name).to.equal('irfantest')
    })  
})
