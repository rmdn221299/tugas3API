import { expect as _expect } from 'chai';
const expect = _expect;
const { getToken } = require("../auth/token.auth.spec.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const userParams = require("../../../data/customer/get.customer.data.json");

async function getCustomer(params, token) {
    const response = await request(config.baseUrl) // baseUrl
    .get(`/customers/${params}`) // endpoint
    .set("Authorization", `Bearer ${token}`)

    return response
}

module.exports = { getCustomer }

describe('Get Customer Detail', () => {
    it('Success Get Customer Detail', async () => {
        const token = await getToken() // get token
        const response = await getCustomer(userParams.success.params, token) // payload from data

        // assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.data.customer.name).to.equal('Irfan Buyer VIP')
    })  
},
    it('Failed Get User Detail', async () => {
        const token = await getToken() // get token
        const response = await getCustomer(userParams.failed.params, token) // payload from data

        // assertion
        expect((await response).status).to.equal(404)
        expect((await response).body.message).to.equal('id tidak valid')
})
)