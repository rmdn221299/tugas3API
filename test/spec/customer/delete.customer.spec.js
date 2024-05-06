import { expect as _expect } from 'chai';
const expect = _expect;
const { getToken } = require("../auth/token.auth.spec.js");
import request from 'supertest';
const config = require("../../../data/config.json");
const userParams = require("../../../data/customer/get.customer.data.json");
const updateUserData = require("../../../data/customer/update.customer.data.json");

async function updateCustomer(params, payload, token) {
    const response = await request(config.baseUrl) // baseUrl
    .put(`/customers/${params}`) // endpoint
    .send(payload)
    .set("Authorization", `Bearer ${token}`)

    return response
}

module.exports = { updateCustomer }

describe('Update Customer Detail', () => {
    it('Success Update Customer Detail', async () => {
        const token = await getToken() // get token
        const response = await updateCustomer(
            userParams.success.params, 
            updateUserData.success,
            token)

        // assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.data.name).to.equal('Irfan Buyer VIP')
    })  
},
    it('Failed Update Customer Detail', async () => {
        const token = await getToken() // get token
        const response = await updateCustomer(
            userParams.failed.params, 
            updateUserData.failed,
            token) 

        // assertion
        expect((await response).status).to.equal(400)
        expect((await response).body.message).to.equal('"name" is not allowed to be empty')
})
)