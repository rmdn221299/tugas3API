import { expect as _expect } from 'chai';
const expect = _expect;
const { getToken } = require("../auth/token.auth.spec.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const customerData = require("../../../data/customer/add.customer.data.json")

async function createCustomer(payload,token) {
    const response = await request(config.baseUrl) // baseUrl
    .post("/customers") // endpoint
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createCustomer }

describe('Create Customer', () => {
    it('Success create a new customer', async () => {
        const token = await getToken() // get token
        const payload = customerData.success
        const response = await createCustomer(payload, token)

        // assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.message).to.equal('Customer berhasil ditambahkan')
    }),
    it('Failed create a new customer', async () => {
        const token = await getToken() // get token
        const payload = customerData.failed
        const response = await createCustomer(payload, token)
        
        // assertion
        expect((await response).status).to.equal(400)
        expect((await response).body.status).to.equal('fail')
    })    
})
